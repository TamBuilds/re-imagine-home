import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, CheckCircle, AlertCircle, PlusCircle } from "lucide-react";
import type { Project, ProjectStatus } from "@/types";

interface ProjectCardProps {
  project: Project;
  onUpdateStatus: (projectId: string, status: ProjectStatus) => void;
  onViewDetails: (projectId: string) => void;
  onAddToShoppingList: (projectId: string) => void;
}

const ProjectCard = ({ project, onUpdateStatus, onViewDetails, onAddToShoppingList }: ProjectCardProps) => {
  const getStatusIcon = () => {
    switch (project.status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-accent" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (project.status) {
      case "completed": return "bg-success text-success-foreground";
      case "in-progress": return "bg-accent text-accent-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getTypeColor = () => {
    return project.type === "AI-suggested" 
      ? "bg-primary text-primary-foreground" 
      : "bg-muted text-muted-foreground";
  };

  return (
    <Card className="hover:shadow-md transition-all duration-300 border-0 bg-card shadow-sm">
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-card-foreground mb-1">{project.title}</h4>
            {project.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
            )}
          </div>
          <div className="flex items-center gap-1 ml-2">
            {getStatusIcon()}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge className={getStatusColor()}>
            {project.status.replace("-", " ")}
          </Badge>
          <Badge className={getTypeColor()}>
            {project.type === "AI-suggested" ? "AI Suggested" : "Manual"}
          </Badge>
          {project.category && (
            <Badge variant="outline" className="text-xs">
              {project.category}
            </Badge>
          )}
        </div>

        {/* Cost and Contractor Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-muted-foreground" />
            <span className="font-medium">${project.estimatedCost.toLocaleString()}</span>
          </div>
          {project.contractorRequired && (
            <span className="text-xs text-warning font-medium">
              Contractor Required
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(project.id)}
          >
            Details
          </Button>
          
          {project.status !== "completed" && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onAddToShoppingList(project.id)}
            >
              <PlusCircle className="w-3 h-3" />
            </Button>
          )}

          {project.status !== "completed" && (
            <Button 
              variant={project.status === "planned" ? "accent" : "success"} 
              size="sm"
              onClick={() => onUpdateStatus(
                project.id, 
                project.status === "planned" ? "in-progress" : "completed"
              )}
            >
              {project.status === "planned" ? "Start" : "Complete"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;