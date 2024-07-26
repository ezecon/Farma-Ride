import { Badge, Button } from "@material-tailwind/react";
 
export function Notifications() {
  return (
    <Badge content="5">
      <Button className="bg-black">Notifications</Button>
    </Badge>
  );
}