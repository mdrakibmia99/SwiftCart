import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, ShieldCheck, Ban, Store } from "lucide-react";
import { getProfile } from "@/services/Profile";
import ProfileCard from "@/components/modules/profile/ProfileCard";

const page = async () => {
  const { data } = await getProfile();
  return (
    <div className="p-6 space-y-5">
      <div className=" space-y-6">
        <Card className="rounded-2xl shadow-lg">
          <CardHeader className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24 shadow-md ring-2 ring-indigo-500">
              {data?.profilePhoto && (
                <AvatarImage
                  src={data?.profilePhoto}
                  alt="User avatar"
                  className="object-cover"
                />
              )}
              <AvatarFallback className="text-2xl font-bold bg-indigo-500 text-white">
                {data?.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mt-4">{data?.name}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail className="w-4 h-4" />
              <span>{data?.email}</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge className="flex items-center gap-1 bg-indigo-100 text-indigo-700">
                <ShieldCheck className="w-4 h-4" />
                {data?.role.toUpperCase()}
              </Badge>
              {data?.hasShop && (
                <Badge className="flex items-center gap-1 bg-emerald-100 text-emerald-700">
                  <Store className="w-4 h-4" />
                  Has Shop
                </Badge>
              )}
              {!data?.isActive && (
                <Badge className="flex items-center gap-1 bg-red-100 text-red-700">
                  <Ban className="w-4 h-4" />
                  Blocked
                </Badge>
              )}
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className=" space-y-6">
        <ProfileCard data={data} />
      </div>
    </div>
  );
};

export default page;
