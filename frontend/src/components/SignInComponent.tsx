"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const providers = [
    {
        name: "Google",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
            </svg>
        ),
        bgColor: "bg-white hover:bg-gray-50",
        textColor: "text-gray-700",
        borderColor: "border-gray-300",
        provider: "google",
    },
    {
        name: "GitHub",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        bgColor: "bg-gray-900 hover:bg-gray-800",
        textColor: "text-white hover:text-white",
        borderColor: "border-gray-900",
        provider: "github",
    },
];
const SignInComponent = () => {
    function capitalizeFirstLetter(str: string) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleSignin = (provider: string) => {
        toast.loading(`Signing in with ${capitalizeFirstLetter(provider)}`);
        signIn(provider, {
            redirectTo: "/",
        });
    };
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-2xl">
                    <CardHeader className="text-center space-y-4 pb-8">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-neutral-900">
                            Welcome to Dev Diaries
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Sign in to your account using your preferred
                            provider
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4 pb-8">
                        {providers.map((provider) => (
                            <Button
                                key={provider.name}
                                onClick={() => handleSignin(provider.provider)}
                                variant="outline"
                                className={`w-full h-12 ${provider.bgColor} ${provider.textColor} ${provider.borderColor} transition-all duration-200 hover:scale-[1.02] hover:shadow-lg group`}
                            >
                                <div className="flex items-center justify-center space-x-3">
                                    <div className="transition-transform duration-200 group-hover:scale-110">
                                        {provider.icon}
                                    </div>
                                    <span className="font-medium text-base">
                                        Continue with {provider.name}
                                    </span>
                                </div>
                            </Button>
                        ))}

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-4 text-gray-500 font-medium">
                                    Secure Authentication
                                </span>
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <svg
                                    className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                                <div>
                                    <p className="text-sm font-medium text-blue-800">
                                        Your data is protected
                                    </p>
                                    <p className="text-xs text-blue-600 mt-1">
                                        We use industry-standard OAuth 2.0 for
                                        secure authentication
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        By signing in, you agree to our{" "}
                        <a
                            href="#"
                            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                            href="#"
                            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInComponent;
