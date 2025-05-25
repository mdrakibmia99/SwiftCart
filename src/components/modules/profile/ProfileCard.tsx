"use client";
import { IProfile } from "@/types/profile";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Globe, Smartphone, Clock, Edit, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const ProfileCard = ({ data }: { data: IProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      <Card>
        <div className="flex items-center border-b-2 border-dashed pb-4 p-6 justify-between ">
          <h1 className="text-lg font-semibold">My Profile</h1>
          <Button
            onClick={() => setIsEditing((prev) => !prev)}
            variant={"default"}
          >
            {isEditing ? (
              <X className="w-4 h-4" />
            ) : (
              <Edit className="w-4 h-4" />
            )}
          </Button>
        </div>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <p className="font-medium">{data.name}</p>
          </div>
          <div className="space-y-2">
            <Label>Email Address</Label>
            <p className="font-medium">{data.email}</p>
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <p className="font-medium">{data.profile.gender}</p>
          </div>
          <div className="space-y-2">
            <Label>Account Status</Label>
            <p className="font-medium">
              {data.isActive ? (
                <Badge variant="default">Active</Badge>
              ) : (
                <Badge variant="destructive">Inactive</Badge>
              )}
            </p>
          </div>
        </CardContent>
        <CardHeader className="text-lg font-semibold  border-b-2 border-dashed pb-4 ">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 " />
            <p> Device Activity</p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 ">
          <div className="space-y-4">
            <Label className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              IP Address
            </Label>
            <p className="font-mono">{data.clientInfo.ipAddress}</p>
          </div>
          <div className="space-y-4">
            <Label className="flex items-center gap-1">
              <Smartphone className="w-4 h-4" />
              Device Type
            </Label>
            <p>{data.clientInfo.device}</p>
          </div>
          <div className="space-y-4">
            <Label className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Last Login
            </Label>
            <p>
              {new Date(data.lastLogin).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
