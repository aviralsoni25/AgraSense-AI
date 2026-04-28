"use client";

import { useMemo } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import type { OutbreakPoint } from "@/types";
import { defaultMapCenter, defaultMapZoom, severityColor } from "@/lib/maps";

type MapViewProps = {
  points: OutbreakPoint[];
  selected?: OutbreakPoint | null;
  onSelect: (point: OutbreakPoint | null) => void;
};

const mapStyle = {
  width: "100%",
  height: "520px",
  borderRadius: "1rem",
};

export function MapView({ points, selected, onSelect }: MapViewProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const { isLoaded } = useJsApiLoader({
    id: "agrosense-map",
    googleMapsApiKey: apiKey,
  });

  const center = useMemo(() => {
    if (!points.length) return defaultMapCenter;
    const first = points[0];
    return { lat: first.lat, lng: first.lng };
  }, [points]);

  if (!apiKey) {
    return (
      <div className="flex h-[520px] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
        Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in `.env.local` to render heatmap.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-[520px] animate-pulse rounded-2xl border border-border bg-muted/50" />
    );
  }

  return (
    <GoogleMap mapContainerStyle={mapStyle} center={center} zoom={defaultMapZoom}>
      {points.map((point) => (
        <Marker
          key={point.id}
          position={{ lat: point.lat, lng: point.lng }}
          onClick={() => onSelect(point)}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: severityColor(point.severity),
            fillOpacity: 0.9,
            strokeWeight: 2,
            strokeColor: "#ffffff",
          }}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => onSelect(null)}
        >
          <div className="max-w-[220px] space-y-1 text-sm">
            <p className="font-semibold">{selected.disease}</p>
            <p>{selected.locationName}</p>
            <p className="text-xs text-muted-foreground">
              Severity: {selected.severity.toUpperCase()} | Reports: {selected.reports}
            </p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}
