import { useEffect, useState } from 'react';

export interface BinData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  acceptedTypes: string; // JSON string of array
  currentFill: number;
  maxCapacity: number;
  status: 'operational' | 'maintenance' | 'offline' | 'full';
  lastEmptied?: Date;
  qrCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionData {
  id: string;
  userId: string;
  binId: string;
  itemType: string;
  itemDescription?: string;
  confidence: number;
  estimatedValue: number;
  pointsEarned: number;
  image?: string;
  weight?: number;
  timestamp: Date;
  user?: {
    name: string;
    email: string;
  };
  bin?: {
    name: string;
    address: string;
  };
}

export interface AlertData {
  id: string;
  type: 'maintenance' | 'full' | 'offline' | 'error';
  binId: string;
  binName: string;
  message: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export const useRealTimeBins = () => {
  const [bins, setBins] = useState<BinData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial bins data
    fetchBins();

    // Set up polling for real-time updates (every 5 seconds)
    const interval = setInterval(fetchBins, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchBins = async () => {
    try {
      const response = await fetch('/api/bins');
      const data = await response.json();
      setBins(data);
    } catch (error) {
      console.error('Error fetching bins:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBinStatus = async (binId: string, status: string, fillLevel: number) => {
    try {
      await fetch(`/api/bins/${binId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, currentFill: fillLevel })
      });
      // Refresh bins after update
      fetchBins();
    } catch (error) {
      console.error('Error updating bin status:', error);
    }
  };

  return { bins, loading, updateBinStatus, fetchBins };
};

export const useRealTimeTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  useEffect(() => {
    // Fetch initial transactions
    fetchTransactions();

    // Set up polling for real-time updates (every 3 seconds)
    const interval = setInterval(fetchTransactions, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const createTransaction = async (transactionData: Partial<TransactionData>) => {
    try {
      await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData)
      });
      // Refresh transactions after creating
      fetchTransactions();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return { transactions, createTransaction, fetchTransactions };
};

export const useRealTimeLocation = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Get user's current location with high accuracy
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000 // 1 minute cache
      };

      const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log('GPS Location obtained:', location);
            setUserLocation(location);
          },
          (error) => {
            console.error('Error getting location:', error);
            // Don't set default location here - let the component handle it
          },
          options
        );
      };

      // Get initial location immediately
      getCurrentLocation();

      // Watch for location changes
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log('GPS Location updated:', location);
          setUserLocation(location);
        },
        (error) => {
          console.error('Error watching location:', error);
        },
        options
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.warn('Geolocation is not supported by this browser');
    }
  }, []);

  return { userLocation };
};

export const useAIDetection = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);

  const startDetection = async (imageData: string) => {
    setIsProcessing(true);
    setProgress(0);
    setResult(null);
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Call the AI detection API
      const response = await fetch('/api/ai-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
      });
      
      const data = await response.json();
      
      clearInterval(progressInterval);
      setProgress(100);
      setResult(data);
      setIsProcessing(false);
    } catch (error) {
      console.error('Error in AI detection:', error);
      setIsProcessing(false);
    }
  };

  return { isProcessing, progress, result, startDetection };
};
