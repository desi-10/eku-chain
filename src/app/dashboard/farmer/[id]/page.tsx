/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

interface FarmerProfileData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  role: string;
  phone_number: string;
  address: string | null;
  bio: string | null;
  profile_picture: string | null;
  is_verified: boolean;
  user: number;
}

const FarmerProfile = ({ params: { id } }: { params: { id: string } }) => {
  const [profile, setProfile] = useState<FarmerProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            `https://agriguru.pythonanywhere.com/api/profiles/?user_id=${id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch profile");
          }
          const data = await response.json();
          const profileData = data.find(
            (profile: FarmerProfileData) =>
              profile.user === parseInt(id as string)
          );
          setProfile(profileData || null);
        } catch (err) {
          setError("Failed to load profile data.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="">
      <div className="max-w-3xl bg-white rounded-lg shadow-lg p-8">
        {profile ? (
          <div>
            {/* Header section */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                {profile.profile_picture ? (
                  <img
                    src={profile.profile_picture}
                    alt={profile.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src="https://via.placeholder.com/150" alt="Profile" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">
                  {profile.username}
                </h1>
                <p className="text-sm text-gray-500">Farmer</p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-gray-600">First Name</p>
                <p className="text-gray-800">{profile.first_name || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Last Name</p>
                <p className="text-gray-800">{profile.last_name || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Email</p>
                <p className="text-gray-800">{profile.email || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Phone Number</p>
                <p className="text-gray-800">{profile.phone_number}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Address</p>
                <p className="text-gray-800">{profile.address || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Bio</p>
                <p className="text-gray-800">{profile.bio || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Verified</p>
                <p className="text-gray-800">
                  {profile.is_verified ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-red-500">No profile found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default FarmerProfile;
