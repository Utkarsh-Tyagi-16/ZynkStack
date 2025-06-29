import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-6 sm:p-8 lg:p-10" style={{ background: 'var(--primary-bg)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <div className="container mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Your Friends
            </h2>
            <p className="text-secondary text-sm sm:text-base">
              Connect and chat with your language learning partners
            </p>
          </div>
          <Link to="/notifications" className="btn button-accent btn-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {/* Friends Section */}
        {loadingFriends ? (
          <div className="flex justify-center py-16">
            <div className="flex flex-col items-center space-y-4">
              <span className="loading loading-spinner loading-lg" />
              <p className="text-secondary">Loading your friends...</p>
            </div>
          </div>
        ) : friends.length === 0 ? (
          <div className="flex justify-center py-16">
            <NoFriendsFound />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* Recommendations Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Meet New Learners
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Discover perfect language exchange partners based on your profile and learning goals
            </p>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-16">
              <div className="flex flex-col items-center space-y-4">
                <span className="loading loading-spinner loading-lg" />
                <p className="text-secondary">Finding language partners...</p>
              </div>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card p-8 text-center max-w-md mx-auto" style={{ background: 'var(--card-bg)', color: 'var(--text-primary)' }}>
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ background: 'var(--message-bg)' }}>
                  <UsersIcon className="size-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-xl">No recommendations available</h3>
                <p className="text-secondary">
                  Check back later for new language partners!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    style={{ background: 'var(--card-bg)', color: 'var(--text-primary)' }}
                  >
                    <div className="card-body p-6 space-y-6">
                      {/* User Info */}
                      <div className="flex items-center gap-4">
                        <div className="avatar size-20 rounded-full ring-4 ring-opacity-20 transition-all duration-300 group-hover:ring-opacity-40" style={{ ringColor: 'var(--accent-color)' }}>
                          <img src={user.profilePic} alt={user.fullName} className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-xl truncate">{user.fullName}</h3>
                          {user.location && (
                            <div className="flex items-center text-sm text-secondary mt-1">
                              <MapPinIcon className="size-4 mr-2" />
                              <span className="truncate">{user.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="flex flex-wrap gap-2">
                        <span className="badge badge-lg px-3 py-2" style={{ background: 'var(--highlight-color)', color: 'var(--primary-bg)' }}>
                          {getLanguageFlag(user.nativeLanguage)}
                          <span className="ml-1 font-semibold">Native: {capitialize(user.nativeLanguage)}</span>
                        </span>
                        <span className="badge badge-outline badge-lg px-3 py-2" style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}>
                          {getLanguageFlag(user.learningLanguage)}
                          <span className="ml-1 font-semibold">Learning: {capitialize(user.learningLanguage)}</span>
                        </span>
                      </div>

                      {/* Bio */}
                      {user.bio && (
                        <div className="space-y-2">
                          <p className="text-sm text-secondary leading-relaxed line-clamp-3">{user.bio}</p>
                        </div>
                      )}

                      {/* Action Button */}
                      <button
                        className={`btn w-full mt-4 transition-all duration-300 ${
                          hasRequestBeenSent ? "btn-disabled opacity-50" : "button-accent hover:scale-105"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-5 mr-2" />
                            <span className="font-semibold">Request Sent</span>
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-5 mr-2" />
                            <span className="font-semibold">Send Friend Request</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
