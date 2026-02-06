"use client";

import * as coco from "@tensorflow-models/coco-ssd";

interface DetectionResult {
  isEWaste: boolean;
  itemType: string;
  confidence: number;
  reasoning: string[];
  detectedObjects: string[];
}

let cocoModel: any = null;

const eWasteTypes: Record<string, string> = {
  'cell phone': 'smartphone',
  'laptop': 'laptop',
  'book': 'tablet',
  'monitor': 'monitor',
  'keyboard': 'keyboard',
  'mouse': 'mouse',
  'teddy bear': 'unknown', // Not e-waste
  'cup': 'unknown', // Not e-waste
  'chair': 'unknown', // Not e-waste
};

const eWasteClasses = ['cell phone', 'laptop', 'monitor', 'keyboard', 'mouse', 'remote', 'microwave', 'oven', 'toaster', 'hair drier'];

export async function loadModels(): Promise<boolean> {
  console.log('🔄 Loading COCO-SSD pretrained model...');
  try {
    cocoModel = await coco.load();
    console.log('✅ COCO-SSD model loaded successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to load model:', error);
    return false;
  }
}

export async function analyzeImage(imageElement: HTMLImageElement): Promise<DetectionResult> {
  try {
    if (!cocoModel) {
      const loaded = await loadModels();
      if (!loaded) {
        return {
          isEWaste: false,
          itemType: 'error',
          confidence: 0,
          reasoning: ['Failed to load detection model'],
          detectedObjects: []
        };
      }
    }

    console.log('🔍 Analyzing image with COCO-SSD...');
    
    // Use the image element directly with the model
    const predictions = await cocoModel.estimateObjects(imageElement);
    
    console.log('📊 Predictions:', predictions);
    
    // Filter for e-waste objects
    const eWasteDetections = predictions.filter((pred: any) => 
      eWasteClasses.some(ewasteClass => 
        pred.class.toLowerCase().includes(ewasteClass.toLowerCase())
      )
    );

    if (eWasteDetections.length > 0) {
      // Get the highest confidence detection
      const bestDetection = eWasteDetections.reduce((best: any, current: any) =>
        current.score > best.score ? current : best
      );

      const detectedClass = bestDetection.class.toLowerCase();
      let itemType = 'unknown';
      
      // Map COCO class names to our e-waste types
      if (detectedClass.includes('cell phone') || detectedClass.includes('phone')) {
        itemType = 'smartphone';
      } else if (detectedClass.includes('laptop')) {
        itemType = 'laptop';
      } else if (detectedClass.includes('monitor') || detectedClass.includes('tv')) {
        itemType = 'monitor';
      } else if (detectedClass.includes('keyboard')) {
        itemType = 'keyboard';
      } else if (detectedClass.includes('mouse')) {
        itemType = 'mouse';
      } else if (detectedClass.includes('remote')) {
        itemType = 'charger';
      } else {
        itemType = detectedClass;
      }

      const confidence = Math.min(0.95, bestDetection.score);

      return {
        isEWaste: true,
        itemType,
        confidence,
        reasoning: [
          `✅ E-waste Detected: ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`,
          `Confidence: ${Math.round(confidence * 100)}%`,
          `Real-time object detection via COCO-SSD pretrained model`,
          `${getDeviceDescription(itemType)}`,
          `Ready for recycling and rewards`
        ],
        detectedObjects: eWasteDetections.map((d: any) => d.class)
      };
    } else {
      // No e-waste detected, but check for any objects
      if (predictions.length > 0) {
        const detectedObjects = predictions.map((p: any) => p.class);
        return {
          isEWaste: false,
          itemType: 'unknown',
          confidence: 0.7,
          reasoning: [
            '❓ No e-waste detected',
            `Detected objects: ${detectedObjects.join(', ')}`,
            'Please upload a clear image of an electronic device',
            'Valid items: smartphones, laptops, monitors, keyboards, mice, etc.'
          ],
          detectedObjects
        };
      } else {
        return {
          isEWaste: false,
          itemType: 'unknown',
          confidence: 0.5,
          reasoning: [
            '❓ No objects detected in image',
            'Please upload a clearer image with proper lighting',
            'Valid e-waste items: phones, laptops, tablets, monitors, etc.'
          ],
          detectedObjects: []
        };
      }
    }
  } catch (error) {
    console.error('❌ Analysis error:', error);
    return {
      isEWaste: false,
      itemType: 'error',
      confidence: 0,
      reasoning: ['Error analyzing image', 'Please try again with a different image'],
      detectedObjects: []
    };
  }
}

function getDeviceDescription(deviceType: string): string {
  const descriptions: Record<string, string> = {
    smartphone: 'High-value recoverable materials: copper, gold, silicon, and rare earth metals',
    laptop: 'Premium e-waste: valuable CPU, GPU, RAM, and hazardous components requiring safe handling',
    tablet: 'Tablet electronics: recoverable semiconductors and valuable metal content',
    monitor: 'Display device: contains hazardous mercury and lead requiring certified recycling',
    keyboard: 'Input device: aluminum frames and valuable plastics for recovery',
    mouse: 'Peripheral device: recyclable metals and circuit board components',
    charger: 'Power adapter: contains transformers, capacitors, and valuable copper windings',
    battery: 'Power source: hazardous lithium requiring professional disposal and recovery',
    headphones: 'Audio device: precious metal contacts and recoverable rare earth materials'
  };
  
  return descriptions[deviceType] || 'Electronic device identified with valuable materials';
}
