"use client";

import { useEffect } from "react";

import { useToast } from "@/hooks/use-toast";
import { ErrorResponse } from "@/utils/types";

export const ErrorToast = ({ error }: { error: ErrorResponse }) => {
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: `Erro: ${error.title}`,
        description: error.description,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return null;
};
