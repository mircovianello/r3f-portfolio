import { useEffect } from 'react';
import { useStore } from '../store';

export default function EventTimer () {
  const { playNext } = useStore((state) => state);

  useEffect(() => {
    const interval = setInterval(() => playNext(), 5000);
    return () => clearInterval(interval);
  },[playNext]);

  return null;
}