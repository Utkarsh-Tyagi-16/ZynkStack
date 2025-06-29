import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden" style={{ background: 'var(--primary-bg)', color: 'var(--text-primary)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-5" style={{ background: 'var(--accent-color)' }}></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full opacity-5" style={{ background: 'var(--highlight-color)' }}></div>
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        <div className="card shadow-2xl backdrop-blur-xl border border-white/10" style={{ background: 'var(--card-bg)', color: 'var(--text-primary)' }}>
          <div className="card-body p-8 sm:p-12">
            <div className="text-center space-y-4 mb-10">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Complete Your Profile
              </h1>
              <p className="text-secondary text-lg max-w-2xl mx-auto">
                Tell us about yourself to help you find the perfect language learning partners
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* PROFILE PIC CONTAINER */}
              <div className="flex flex-col items-center justify-center space-y-6">
                {/* IMAGE PREVIEW */}
                <div className="relative">
                  <div className="size-40 rounded-full overflow-hidden ring-4 ring-opacity-20 transition-all duration-300 hover:ring-opacity-40" style={{ background: 'var(--message-bg)', ringColor: 'var(--accent-color)' }}>
                    {formState.profilePic ? (
                      <img
                        src={formState.profilePic}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="size-16 rounded-full flex items-center justify-center" style={{ background: 'var(--card-bg)' }}>
                          <CameraIcon className="size-8 text-secondary" />
                        </div>
                      </div>
                    )}
                  </div>
                  {formState.profilePic && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--highlight-color)' }}>
                      <div className="size-3 rounded-full" style={{ background: 'var(--primary-bg)' }}></div>
                    </div>
                  )}
                </div>

                {/* Generate Random Avatar BTN */}
                <button type="button" onClick={handleRandomAvatar} className="btn button-accent shadow-lg hover:shadow-xl transition-all duration-300">
                  <ShuffleIcon className="size-5 mr-3" />
                  <span className="font-semibold">Generate Random Avatar</span>
                </button>
              </div>

              {/* FULL NAME */}
              <div className="form-control space-y-3">
                <label className="label">
                  <span className="label-text text-lg font-semibold">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  className="input input-bordered w-full h-14 text-lg"
                  placeholder="Your full name"
                />
              </div>

              {/* BIO */}
              <div className="form-control space-y-3">
                <label className="label">
                  <span className="label-text text-lg font-semibold">Bio</span>
                </label>
                <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  className="textarea textarea-bordered h-32 text-lg resize-none"
                  placeholder="Tell others about yourself and your language learning goals..."
                />
              </div>

              {/* LANGUAGES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* NATIVE LANGUAGE */}
                <div className="form-control space-y-3">
                  <label className="label">
                    <span className="label-text text-lg font-semibold">Native Language</span>
                  </label>
                  <select
                    name="nativeLanguage"
                    value={formState.nativeLanguage}
                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                    className="select select-bordered w-full h-14 text-lg"
                  >
                    <option value="">Select your native language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* LEARNING LANGUAGE */}
                <div className="form-control space-y-3">
                  <label className="label">
                    <span className="label-text text-lg font-semibold">Learning Language</span>
                  </label>
                  <select
                    name="learningLanguage"
                    value={formState.learningLanguage}
                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                    className="select select-bordered w-full h-14 text-lg"
                  >
                    <option value="">Select language you're learning</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* LOCATION */}
              <div className="form-control space-y-3">
                <label className="label">
                  <span className="label-text text-lg font-semibold">Location</span>
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-4 size-6 text-secondary" />
                  <input
                    type="text"
                    name="location"
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    className="input input-bordered w-full h-14 text-lg pl-12"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button className="btn button-accent w-full h-16 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300" disabled={isPending} type="submit">
                {!isPending ? (
                  <>
                    <ShipWheelIcon className="size-6 mr-3" />
                    Complete Onboarding
                  </>
                ) : (
                  <>
                    <LoaderIcon className="animate-spin size-6 mr-3" />
                    Setting up your profile...
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OnboardingPage;
