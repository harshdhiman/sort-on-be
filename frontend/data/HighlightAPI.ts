import axios from "axios";
import { HighlightItem } from "./HighlightItem";

const BASE_URL = "http://localhost:3001";

/**
 * Basic Highlight API functions
 */
export namespace HighlightAPI {
  export async function getHighlights() {
    const response = await axios.get<{
      items: HighlightItem[];
    }>(`${BASE_URL}/getAllData`);
    return response.data.items;
  }

  export async function updateHighlights(items: HighlightItem[]) {
    await axios.post(`${BASE_URL}/updateData`, {
      items,
    });
  }

  export async function deleteHighlight(id: string) {
    await axios.delete(`${BASE_URL}/delete/${id}`);
  }
}
