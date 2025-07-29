import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Sparkles } from "lucide-react";
import RoomCard from "@/components/RoomCard";
import ProjectCard from "@/components/ProjectCard";
import AddRoomDialog from "@/components/AddRoomDialog";
import BottomNavigation from "@/components/BottomNavigation";
import heroImage from "@/assets/hero-image.jpg";
import type { Room, Project } from "@/types";

// Mock data for demo
const mockRooms: Room[] = [
  {
    id: "1",
    name: "Master Bedroom",
    type: "Bedroom",
    imageUrl: heroImage,
    projects: [
      { 
        id: "1", 
        title: "Paint walls", 
        type: "manual",
        status: "in-progress", 
        estimatedCost: 200,
        contractorRequired: false,
        category: "Paint"
      },
      { 
        id: "2", 
        title: "Install baseboards", 
        type: "AI-suggested",
        status: "planned", 
        estimatedCost: 150,
        contractorRequired: false,
        category: "Trim"
      }
    ],
    totalBudget: 1500,
    completedProjects: 1
  },
  {
    id: "2", 
    name: "Living Room",
    type: "Living Room",
    projects: [
      { 
        id: "3", 
        title: "New lighting", 
        type: "AI-suggested",
        status: "completed", 
        estimatedCost: 300,
        contractorRequired: true,
        category: "Electrical"
      }
    ],
    totalBudget: 2000,
    completedProjects: 1
  }
];

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Paint accent wall",
    type: "AI-suggested",
    status: "in-progress",
    estimatedCost: 180,
    contractorRequired: false,
    category: "Paint",
    description: "Add a warm accent color to create visual interest"
  },
  {
    id: "2",
    title: "Install crown molding",
    type: "manual",
    status: "planned",
    estimatedCost: 450,
    contractorRequired: true,
    category: "Trim"
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("rooms");
  const [rooms, setRooms] = useState(mockRooms);
  const [projects, setProjects] = useState(mockProjects);
  const [showAddRoomDialog, setShowAddRoomDialog] = useState(false);

  const handleAddRoom = (newRoom: any) => {
    const room = {
      ...newRoom,
      id: Date.now().toString(),
      projects: [],
      completedProjects: 0
    };
    setRooms([...rooms, room]);
  };

  const handleTabChange = (tab: string) => {
    if (tab === "add") {
      setShowAddRoomDialog(true);
    } else {
      setActiveTab(tab);
    }
  };

  const renderRoomsTab = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <img 
          src={heroImage} 
          alt="Beautiful home interior" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center">
          <div className="p-6 text-primary-foreground">
            <h1 className="text-2xl font-bold mb-2">Welcome to ReMould</h1>
            <p className="text-primary-foreground/90 mb-4">Transform your space, track your progress</p>
            <Button 
              variant="secondary" 
              onClick={() => setShowAddRoomDialog(true)}
              className="shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Room
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{rooms.length}</div>
            <div className="text-xs text-muted-foreground">Rooms</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{projects.length}</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">2</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Rooms Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Rooms</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {rooms.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground mb-4">
                <Plus className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No rooms added yet</p>
                <p className="text-sm">Add your first room to get started</p>
              </div>
              <Button onClick={() => setShowAddRoomDialog(true)}>
                Add Room
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onViewDetails={(id) => console.log("View room", id)}
                onAddProject={(id) => console.log("Add project to room", id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderProjectsTab = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Projects</h1>
        <p className="text-muted-foreground">Track your renovation progress</p>
      </div>

      {/* AI Suggestions Banner */}
      <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-accent/20 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">AI Project Suggestions</h3>
              <p className="text-sm text-muted-foreground">Get smart recommendations based on your room photos</p>
            </div>
            <Button variant="accent" size="sm">
              Enable AI
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onUpdateStatus={(id, status) => {
              setProjects(prev => prev.map(p => 
                p.id === id ? { ...p, status } : p
              ));
            }}
            onViewDetails={(id) => console.log("View project", id)}
            onAddToShoppingList={(id) => console.log("Add to shopping list", id)}
          />
        ))}
      </div>
    </div>
  );

  const renderShoppingTab = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Shopping List</h1>
        <p className="text-muted-foreground">Items needed for your projects</p>
      </div>
      
      <Card className="border-dashed border-2">
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">
            <Plus className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No items in your shopping list</p>
            <p className="text-sm">Add items from your projects</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>
      
      <Card>
        <CardContent className="p-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">U</span>
          </div>
          <h3 className="font-semibold mb-1">Welcome User</h3>
          <p className="text-sm text-muted-foreground">user@example.com</p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="max-w-sm mx-auto px-4 pt-6 pb-20">
        {activeTab === "rooms" && renderRoomsTab()}
        {activeTab === "projects" && renderProjectsTab()}
        {activeTab === "shopping" && renderShoppingTab()}
        {activeTab === "profile" && renderProfileTab()}
      </div>

      {/* Add Room Dialog */}
      <AddRoomDialog
        open={showAddRoomDialog}
        onOpenChange={setShowAddRoomDialog}
        onAddRoom={handleAddRoom}
      />

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default Index;
