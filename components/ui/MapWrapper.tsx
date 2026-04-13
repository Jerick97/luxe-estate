'use client';

import dynamic from 'next/dynamic';

interface Props {
  lat?: number;
  lng?: number;
}

const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="w-full min-h-[300px] bg-slate-100 dark:bg-white/5 animate-pulse rounded-lg" />
});

export default function MapWrapper({ lat, lng }: Props) {
  return <DynamicMap lat={lat} lng={lng} />;
}
