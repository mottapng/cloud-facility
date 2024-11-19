import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export const PumpGridHead = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex gap-4 justify-between items-end">
        <div>
          <h1 className="text-4xl font-medium">Olá, João✌️</h1>
          <p className="text-lg text-muted-foreground">
            Bem vindo de volta! Aqui está a vazão em tempo real das bombas
            cadastradas.
          </p>
        </div>
      </div>
      <div className="mt-auto flex gap-3">
        <Button className="text-base flex gap-2 ml-auto">
          <Plus size={16} />
          <span className="mr-1">Nova Bomba</span>
        </Button>
      </div>
    </div>
  );
};
