import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // This is how we did it at first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: loginMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  // This is how we did it using our custom hook - optimized version
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden"
      style={{ background: 'var(--primary-bg)', color: 'var(--text-primary)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10" style={{ background: 'var(--accent-color)' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10" style={{ background: 'var(--highlight-color)' }}></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row w-full rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl border border-white/10"
          style={{ background: 'var(--card-bg)', color: 'var(--text-primary)' }}>
          
          {/* LOGIN FORM SECTION */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
            {/* LOGO */}
            <div className="mb-8 flex items-center justify-start gap-3">
              <div className="p-3 rounded-xl" style={{ background: 'var(--message-bg)' }}>
                <ShipWheelIcon className="size-10" style={{ color: 'var(--accent-color)' }} />
              </div>
              <span className="text-4xl font-bold font-mono bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, var(--accent-color), var(--highlight-color))' }}>
                Streamify
              </span>
            </div>

            {/* ERROR MESSAGE DISPLAY */}
            {error && (
              <div className="alert alert-error mb-6 rounded-xl border border-red-500/20">
                <span className="font-medium">{error.response.data.message}</span>
              </div>
            )}

            <div className="w-full">
              <form onSubmit={handleLogin} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Welcome Back</h2>
                    <p className="text-secondary text-lg">
                      Sign in to your account to continue your language journey
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="form-control space-y-3">
                      <label className="label">
                        <span className="label-text text-lg font-semibold">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="hello@example.com"
                        className="input input-bordered w-full h-14 text-lg"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-control space-y-3">
                      <label className="label">
                        <span className="label-text text-lg font-semibold">Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="input input-bordered w-full h-14 text-lg"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>

                    <button type="submit" className="btn button-accent w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" disabled={isPending}>
                      {isPending ? (
                        <>
                          <span className="loading loading-spinner loading-md"></span>
                          <span className="ml-2">Signing in...</span>
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </button>

                    <div className="text-center pt-4">
                      <p className="text-secondary text-lg">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-semibold hover:underline transition-all duration-300" style={{ color: 'var(--accent-color)' }}>
                          Create one
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center relative" style={{ background: 'var(--primary-bg)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>
            <div className="relative max-w-md p-12 text-center space-y-8">
              {/* Illustration */}
              <div className="relative aspect-square max-w-sm mx-auto">
                <div className="absolute inset-0 rounded-3xl" style={{ background: 'var(--message-bg)' }}></div>
                <img src="/i.png" alt="Language connection illustration" className="w-full h-full object-contain relative z-10" />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Connect with language partners worldwide</h2>
                <p className="text-secondary text-lg leading-relaxed">
                  Practice conversations, make friends, and improve your language skills together
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
