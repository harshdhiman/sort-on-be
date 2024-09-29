import { useMutation, useQuery } from "@tanstack/react-query";
import { HighlightAPI } from "./HighlightAPI";
import { useEffect, useState } from "react";
import { HighlightItem } from "./HighlightItem";

/**
 * Hook to Manage the Highlights
 */
export function useHightlights() {
  //Local State for the items which updates instantly
  const [items, setItems] = useState<HighlightItem[]>([]);

  // Initial Fetch Query
  const query = useQuery({
    queryKey: ["highlights"],
    queryFn: HighlightAPI.getHighlights,
  });

  // Update Mutation
  const updateHighlightsMutation = useMutation({
    mutationFn: HighlightAPI.updateHighlights,
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: HighlightAPI.deleteHighlight,
  });

  // Update the local state when the query data changes
  useEffect(() => {
    if (query.data) {
      // sort the items by the order
      const sortedItems = query.data.toSorted(
        (a: HighlightItem, b: HighlightItem) => {
          return a.order - b.order;
        }
      );
      setItems(sortedItems);
    }
  }, [query.data]);

  // Updates the Items on both the local state and the server
  function updateItems(fn: (items: HighlightItem[]) => HighlightItem[]) {
    // update the order of the items
    const fnResult = fn(items);
    const updatedItems = fnResult.map((item, index) => {
      return {
        ...item,
        order: index + 1,
      };
    });
    setItems(updatedItems);
    updateHighlightsMutation.mutate(updatedItems);
  }

  // Deletes an item from the local state and the server
  function deleteItem(id: string) {
    const updatedItems = items.filter((item) => item._id !== id);
    setItems(updatedItems);
    deleteMutation.mutate(id);
  }

  return {
    hightlightQuery: query,
    isLoading: query.isLoading,
    items,
    updateItems,
    updationLoading: updateHighlightsMutation.isPending,
    deleteItem,
  };
}
