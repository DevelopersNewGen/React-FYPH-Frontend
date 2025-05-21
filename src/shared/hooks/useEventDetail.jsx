import { useEffect, useState } from "react";
import { getEvents } from "../../services/api.jsx";

const IMAGEN_EVENTO_DEFAULT =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";
const IMAGENES_DEMO = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
];

export function useEventDetail(eid) {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(IMAGEN_EVENTO_DEFAULT);

  useEffect(() => {
    async function fetchEvento() {
      try {
        const data = await getEvents();
        const found = (data.events || []).find((e) => String(e.eid) === eid);
        setEvento(found);
        const img = found?.imagenes?.[0] || IMAGEN_EVENTO_DEFAULT;
        setMainImage(img);
      } catch {
        setEvento(null);
      } finally {
        setLoading(false);
      }
    }
    fetchEvento();
  }, [eid]);

  const getPreviewImages = () => {
    if (evento?.imagenes && evento.imagenes.length > 1) {
      return evento.imagenes.slice(1, 4);
    }
    return IMAGENES_DEMO.slice(0, 3);
  };

  return { evento, loading, mainImage, setMainImage, getPreviewImages };
}
