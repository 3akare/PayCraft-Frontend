import { refreshToken } from "@/actions/auth";
import { API_STATUS_CODES, AUTH_STATUS_CODES } from "@/constants/statusCodes";
import { useAuthActions } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import { convertToSeconds } from "@/lib/utils";

export const useRefreshToken = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setCookie] = useCookies();
	const { setAccessToken } = useAuthActions();
	const { toast } = useToast();

	const navigate = useNavigate();

	return useMutation({
		mutationFn: refreshToken,
		retry: false,
		onMutate: () => console.log("Refreshing Token"),
		onSuccess: (res) => {
			if (
				res.statusCode === API_STATUS_CODES.REQUEST_SUCCESS ||
				res.statusCode === AUTH_STATUS_CODES.REFRESH_TOKEN_SUCCESS
			) {
				toast({
					description: res.statusMessage,
				});
				setAccessToken(res.data.accessToken);
				setCookie("refresh_token", res.data.accessToken, {
					maxAge: convertToSeconds(res.data.refreshTokenValidityTime),
					sameSite: true,
					secure: true,
				});
				navigate("/dashboard", {
					replace: true,
				});
			}
		},
	});
};
