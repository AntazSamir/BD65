import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { UpdateUser } from "@shared/schema";

export function useProfile() {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: UpdateUser) => {
      return await apiRequest("PUT", "/api/profile", profileData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });

  return {
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
  };
}