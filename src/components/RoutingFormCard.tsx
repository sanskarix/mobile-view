
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';
import { MoreHorizontal, Download, Copy, Trash2, Edit } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface RoutingFormCardProps {
  form: {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    responses: number;
    teamName: string;
    createdAt: string;
  };
  onEdit: (formId: string) => void;
  onToggle: (formId: string, enabled: boolean) => void;
  onDownload: (formId: string) => void;
  onDuplicate: (formId: string) => void;
  onDelete: (formId: string) => void;
}

export const RoutingFormCard: React.FC<RoutingFormCardProps> = ({
  form,
  onEdit,
  onToggle,
  onDownload,
  onDuplicate,
  onDelete
}) => {
  const [isEnabled, setIsEnabled] = useState(form.enabled);

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    onToggle(form.id, checked);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click when interacting with controls
    if ((e.target as HTMLElement).closest('.card-controls')) {
      return;
    }
    onEdit(form.id);
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleCardClick}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground truncate">{form.title}</h3>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                {form.teamName}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{form.description}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{form.responses} responses</span>
              <span>•</span>
              <span>Created {new Date(form.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 card-controls">
            <Switch
              checked={isEnabled}
              onCheckedChange={handleToggle}
            />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(form.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDownload(form.id)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download responses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDuplicate(form.id)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(form.id)} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
