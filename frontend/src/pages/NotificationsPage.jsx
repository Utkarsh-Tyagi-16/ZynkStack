import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-6 sm:p-8 lg:p-10" style={{ background: 'var(--primary-bg)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <div className="container mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Stay updated with friend requests and new connections
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center space-y-6">
              <span className="loading loading-spinner loading-lg" />
              <p className="text-secondary text-lg">Loading notifications...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {incomingRequests.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <div className="p-3 rounded-xl" style={{ background: 'var(--message-bg)' }}>
                    <UserCheckIcon className="h-6 w-6" style={{ color: 'var(--accent-color)' }} />
                  </div>
                  <h2 className="text-2xl font-bold">Friend Requests</h2>
                  <span className="badge badge-lg px-4 py-2" style={{ background: 'var(--highlight-color)', color: 'var(--primary-bg)' }}>
                    {incomingRequests.length}
                  </span>
                </div>

                <div className="grid gap-6">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                      style={{ background: 'var(--card-bg)', color: 'var(--text-primary)' }}
                    >
                      <div className="card-body p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="avatar size-20 rounded-full ring-4 ring-opacity-20 transition-all duration-300 group-hover:ring-opacity-40" style={{ ringColor: 'var(--accent-color)' }}>
                              <img src={request.sender.profilePic} alt={request.sender.fullName} className="object-cover" />
                            </div>
                            <div className="space-y-3">
                              <h3 className="font-bold text-xl">{request.sender.fullName}</h3>
                              <div className="flex flex-wrap gap-2">
                                <span className="badge badge-lg px-3 py-2" style={{ background: 'var(--message-bg)', color: 'var(--text-secondary)' }}>
                                  Native: {request.sender.nativeLanguage}
                                </span>
                                <span className="badge badge-outline badge-lg px-3 py-2" style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}>
                                  Learning: {request.sender.learningLanguage}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            className="btn button-green btn-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={() => acceptRequestMutation(request._id)}
                            disabled={isPending}
                          >
                            <span className="font-semibold">Accept</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ACCEPTED REQS NOTIFICATIONS */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <div className="p-3 rounded-xl" style={{ background: 'var(--message-bg)' }}>
                    <BellIcon className="h-6 w-6" style={{ color: 'var(--highlight-color)' }} />
                  </div>
                  <h2 className="text-2xl font-bold">New Connections</h2>
                </div>

                <div className="grid gap-6">
                  {acceptedRequests.map((notification) => (
                    <div key={notification._id} className="card group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2" style={{ background: 'var(--card-bg)', color: 'var(--text-primary)' }}>
                      <div className="card-body p-6">
                        <div className="flex items-start gap-6">
                          <div className="avatar size-16 rounded-full ring-4 ring-opacity-20 transition-all duration-300 group-hover:ring-opacity-40" style={{ ringColor: 'var(--highlight-color)' }}>
                            <img
                              src={notification.recipient.profilePic}
                              alt={notification.recipient.fullName}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-3">
                            <h3 className="font-bold text-xl">{notification.recipient.fullName}</h3>
                            <p className="text-secondary text-lg">
                              {notification.recipient.fullName} accepted your friend request
                            </p>
                            <div className="flex items-center gap-4">
                              <p className="text-sm text-secondary flex items-center gap-2">
                                <ClockIcon className="h-4 w-4" />
                                Recently
                              </p>
                              <div className="badge badge-lg px-4 py-2" style={{ background: 'var(--highlight-color)', color: 'var(--primary-bg)' }}>
                                <MessageSquareIcon className="h-4 w-4 mr-2" />
                                New Friend
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <div className="flex justify-center py-20">
                <NoNotificationsFound />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default NotificationsPage;
