import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { 
  MapPinIcon, 
  MessageSquareIcon, 
  PhoneIcon, 
  UserMinusIcon, 
  UsersIcon,
  SearchIcon,
  FilterIcon
} from "lucide-react";
import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { getUserFriends, removeFriend } from "../lib/api";

const FriendsPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");

  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { mutate: removeFriendMutation, isPending } = useMutation({
    mutationFn: removeFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  // Filter friends based on search term and language filter
  const filteredFriends = friends.filter((friend) => {
    const matchesSearch = friend.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         friend.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         friend.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLanguage = !filterLanguage || 
                           friend.nativeLanguage?.toLowerCase() === filterLanguage.toLowerCase() ||
                           friend.learningLanguage?.toLowerCase() === filterLanguage.toLowerCase();
    
    return matchesSearch && matchesLanguage;
  });

  // Get unique languages for filter dropdown
  const allLanguages = [...new Set([
    ...friends.map(f => f.nativeLanguage).filter(Boolean),
    ...friends.map(f => f.learningLanguage).filter(Boolean)
  ])];

  const handleRemoveFriend = (friendId) => {
    if (window.confirm("Are you sure you want to remove this friend?")) {
      removeFriendMutation(friendId);
    }
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10" style={{ background: 'var(--primary-bg)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <div className="container mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              My Friends
            </h1>
            <p className="text-secondary text-sm sm:text-base">
              {friends.length} language learning partner{friends.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link to="/notifications" className="btn button-accent btn-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-secondary" />
            <input
              type="text"
              placeholder="Search friends by name, bio, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            />
          </div>
          <div className="relative">
            <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-secondary" />
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="select select-bordered pl-10"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            >
              <option value="">All Languages</option>
              {allLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {capitialize(lang)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Friends Grid */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="flex flex-col items-center space-y-4">
              <span className="loading loading-spinner loading-lg" />
              <p className="text-secondary">Loading your friends...</p>
            </div>
          </div>
        ) : filteredFriends.length === 0 ? (
          <div className="flex justify-center py-16">
            {friends.length === 0 ? (
              <NoFriendsFound />
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ background: 'var(--message-bg)' }}>
                  <SearchIcon className="size-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-xl">No friends found</h3>
                <p className="text-secondary">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFriends.map((friend) => (
              <div
                key={friend._id}
                className="card group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ background: 'var(--card-bg)', color: 'var(--text-primary)' }}
              >
                <div className="card-body p-6 space-y-4">
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <div className="avatar size-16 rounded-full ring-4 ring-opacity-20 transition-all duration-300 group-hover:ring-opacity-40" style={{ ringColor: 'var(--accent-color)' }}>
                      <img src={friend.profilePic} alt={friend.fullName} className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg truncate">{friend.fullName}</h3>
                      {friend.location && (
                        <div className="flex items-center text-sm text-secondary mt-1">
                          <MapPinIcon className="size-4 mr-2" />
                          <span className="truncate">{friend.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-lg px-3 py-2" style={{ background: 'var(--highlight-color)', color: 'var(--primary-bg)' }}>
                      {getLanguageFlag(friend.nativeLanguage)}
                      <span className="ml-1 font-semibold">Native: {capitialize(friend.nativeLanguage)}</span>
                    </span>
                    <span className="badge badge-outline badge-lg px-3 py-2" style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}>
                      {getLanguageFlag(friend.learningLanguage)}
                      <span className="ml-1 font-semibold">Learning: {capitialize(friend.learningLanguage)}</span>
                    </span>
                  </div>

                  {/* Bio */}
                  {friend.bio && (
                    <div className="space-y-2">
                      <p className="text-sm text-secondary leading-relaxed line-clamp-3">{friend.bio}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/chat/${friend._id}`}
                      className="btn flex-1 button-accent hover:scale-105 transition-all duration-300"
                    >
                      <MessageSquareIcon className="size-4 mr-2" />
                      <span className="font-semibold">Message</span>
                    </Link>
                    <Link
                      to={`/call/${friend._id}`}
                      className="btn flex-1 button-green hover:scale-105 transition-all duration-300"
                    >
                      <PhoneIcon className="size-4 mr-2" />
                      <span className="font-semibold">Call</span>
                    </Link>
                  </div>

                  {/* Remove Friend Button */}
                  <button
                    className="btn btn-outline btn-sm w-full text-error hover:bg-error hover:text-white transition-all duration-300"
                    onClick={() => handleRemoveFriend(friend._id)}
                    disabled={isPending}
                  >
                    <UserMinusIcon className="size-4 mr-2" />
                    <span className="font-semibold">Remove Friend</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage; 