import { Home, PlusCircle, ShoppingCart, User, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  {
    id: "rooms",
    label: "Rooms",
    icon: Home,
  },
  {
    id: "projects",
    label: "Projects",
    icon: BarChart3,
  },
  {
    id: "add",
    label: "Add",
    icon: PlusCircle,
  },
  {
    id: "shopping",
    label: "Shopping",
    icon: ShoppingCart,
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
];

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-sm mx-auto px-4">
        <nav className="flex items-center justify-around py-2">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            const isAddButton = item.id === "add";
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200",
                  isAddButton && [
                    "bg-accent text-accent-foreground shadow-lg -mt-4 p-3",
                    "hover:bg-accent-hover transform hover:scale-105"
                  ],
                  !isAddButton && [
                    isActive ? "text-primary" : "text-muted-foreground",
                    "hover:text-accent-foreground hover:bg-accent/50"
                  ]
                )}
              >
                <item.icon 
                  className={cn(
                    isAddButton ? "w-6 h-6" : "w-5 h-5",
                    "transition-transform duration-200"
                  )} 
                />
                <span 
                  className={cn(
                    "text-xs mt-1 font-medium transition-colors duration-200",
                    isAddButton && "text-accent-foreground",
                    !isAddButton && isActive && "text-primary"
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default BottomNavigation;