// Theme configuration for shadcn/ui
// This file defines CSS custom properties for light and dark themes
// Reference: https://ui.shadcn.com/docs/theming

export const themeConfig = {
  light: {
    // Base colors
    background: "0 0% 100%",           // hsl(0, 0%, 100%) - white
    foreground: "222.2 84% 4.9%",     // hsl(222.2, 84%, 4.9%) - dark text
    
    // Card colors
    card: "0 0% 100%",                // hsl(0, 0%, 100%) - white
    "card-foreground": "222.2 84% 4.9%", // hsl(222.2, 84%, 4.9%) - dark text
    
    // Popover colors
    popover: "0 0% 100%",             // hsl(0, 0%, 100%) - white
    "popover-foreground": "222.2 84% 4.9%", // hsl(222.2, 84%, 4.9%) - dark text
    
    // Primary colors
    primary: "262.1 83.3% 57.8%",     // hsl(262.1, 83.3%, 57.8%) - indigo
    "primary-foreground": "210 40% 98%", // hsl(210, 40%, 98%) - light text
    
    // Secondary colors
    secondary: "210 40% 96%",          // hsl(210, 40%, 96%) - light gray
    "secondary-foreground": "222.2 84% 4.9%", // hsl(222.2, 84%, 4.9%) - dark text
    
    // Muted colors
    muted: "210 40% 96%",             // hsl(210, 40%, 96%) - light gray
    "muted-foreground": "215.4 16.3% 46.9%", // hsl(215.4, 16.3%, 46.9%) - gray text
    
    // Accent colors
    accent: "210 40% 96%",            // hsl(210, 40%, 96%) - light gray
    "accent-foreground": "222.2 84% 4.9%", // hsl(222.2, 84%, 4.9%) - dark text
    
    // Destructive colors
    destructive: "0 84.2% 60.2%",     // hsl(0, 84.2%, 60.2%) - red
    "destructive-foreground": "210 40% 98%", // hsl(210, 40%, 98%) - light text
    
    // Border and input
    border: "214.3 31.8% 91.4%",      // hsl(214.3, 31.8%, 91.4%) - light gray
    input: "214.3 31.8% 91.4%",       // hsl(214.3, 31.8%, 91.4%) - light gray
    
    // Ring
    ring: "262.1 83.3% 57.8%",        // hsl(262.1, 83.3%, 57.8%) - indigo
    
    // Radius
    radius: "0.5rem",
  },
  
  dark: {
    // Base colors
    background: "222.2 84% 4.9%",     // hsl(222.2, 84%, 4.9%) - dark
    foreground: "210 40% 98%",        // hsl(210, 40%, 98%) - light text
    
    // Card colors
    card: "222.2 84% 4.9%",           // hsl(222.2, 84%, 4.9%) - dark
    "card-foreground": "210 40% 98%", // hsl(210, 40%, 98%) - light text
    
    // Popover colors
    popover: "222.2 84% 4.9%",        // hsl(222.2, 84%, 4.9%) - dark
    "popover-foreground": "210 40% 98%", // hsl(210, 40%, 98%) - light text
    
    // Primary colors
    primary: "262.1 83.3% 57.8%",     // hsl(262.1, 83.3%, 57.8%) - indigo
    "primary-foreground": "210 40% 98%", // hsl(210, 40%, 98%) - light text
    
    // Secondary colors
    secondary: "217.2 32.6% 17.5%",   // hsl(217.2, 32.6%, 17.5%) - dark gray
    "secondary-foreground": "210 40% 98%", // hsl(210, 40%, 98%) - light text
    
    // Muted colors
    muted: "217.2 32.6% 17.5%",       // hsl(217.2, 32.6%, 17.5%) - dark gray
    "muted-foreground": "215 20.2% 65.1%", // hsl(215, 20.2%, 65.1%) - gray text
    
    // Accent colors
    accent: "217.2 32.6% 17.5%",      // hsl(217.2, 32.6%, 17.5%) - dark gray
    "accent-foreground": "210 40% 98%", // hsl(210, 40%, 98%) - light text
    
    // Destructive colors
    destructive: "0 62.8% 30.6%",     // hsl(0, 62.8%, 30.6%) - dark red
    "destructive-foreground": "210 40% 98%", // hsl(210, 40%, 98%) - light text
    
    // Border and input
    border: "217.2 32.6% 17.5%",      // hsl(217.2, 32.6%, 17.5%) - dark gray
    input: "217.2 32.6% 17.5%",       // hsl(217.2, 32.6%, 17.5%) - dark gray
    
    // Ring
    ring: "262.1 83.3% 57.8%",        // hsl(262.1, 83.3%, 57.8%) - indigo
    
    // Radius
    radius: "0.5rem",
  }
};

export default themeConfig;
