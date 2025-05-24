import { useEffect, useState } from "react";
import { getEvents } from "../../services/index.js";

export function useEventDetail(eid) {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    async function fetchEvento() {
      try {
        const data = await getEvents();
        const found = (data.events || []).find((e) => String(e.eid) === eid);
        setEvento(found);
        const img = found?.images?.[0] || null;
        setMainImage(img);
      } catch {
        setEvento(null);
        setMainImage(null);
      } finally {
        setLoading(false);
      }
    }
    fetchEvento();
  }, [eid]);

  const getPreviewImages = () => {
    if (evento?.images && evento.images.length > 1) {
      return evento.images.slice(1, 4);
    }
    return [];
  };

  return { evento, loading, mainImage, setMainImage, getPreviewImages };
}