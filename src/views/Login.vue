<template>
	<div>
		<v-app>
			<div class="login-wrapper">
				<v-tabs>
					<v-tab style="width: 50%">
						<v-icon left>mdi-account</v-icon>
						Log In
					</v-tab>
					<v-tab style="width: 50%">
						<v-icon left>mdi-account-edit</v-icon>
						Sign Up
					</v-tab>
					<v-tab-item>
						<v-card flat>
							<v-container class="login-container">
								<v-container class="login-message">
									<v-img
										src="@/assets/logos/sounder.png"
										max-width="64px"
										class="sounder-img"
									/>
									<span>
										Log in to
										<span class="title" style="text-align: center">
											Sound<span class="sounder-end">er</span>
										</span>
									</span>
									<v-text-field
										@keyup="checkLogin()"
										name="login-email"
										label="Email"
									/>
									<v-text-field
										@keyup="checkLogin()"
										name="login-password"
										type="password"
										label="Password"
									/>
									<v-btn
										id="loginButton"
										type="submit"
										rounded
										:disabled="!loginEnable"
										:loading="isLoading"
										color="primary"
										class="login-btn"
										@click="loginFlow()"
									>
										Log in
									</v-btn>
									<div class="messageCard" v-if="showLoginErrorMessage">
										<v-icon class="errorIcon" left>mdi-close-octagon</v-icon>
										<v-card-text>
											The email or password you have entered is incorrect,
											Please try again.
										</v-card-text>
									</div>
								</v-container>
							</v-container>
						</v-card>
					</v-tab-item>
					<v-tab-item>
						<v-card flat>
							<v-container class="login-container">
								<v-container class="login-message">
									<v-img
										src="@/assets/logos/sounder.png"
										max-width="64px"
										class="sounder-img"
									/>
									<span>
										Sign Up To
										<span class="title" style="text-align: center">
											Sound<span class="sounder-end">er</span>
										</span>
									</span>
									<v-text-field
										@keyup="checkSingUp"
										name="signIn-name"
										label="Name"
									/>
									<v-text-field
										@keyup="checkSingUp"
										name="signIn-email"
										label="Email"
									/>
									<v-text-field
										@keyup="checkSingUp"
										name="signIn-password"
										type="password"
										label="New Password"
									/>
									<v-btn
										:disabled="!signUpEnable"
										rounded
										:loading="isLoading"
										color="primary"
										class="login-btn"
										@click="signUpFlow()"
									>
										Sign up
									</v-btn>
									<div class="messageCard" v-if="showSignUpErrorMessage">
										<v-icon class="errorIcon" left>mdi-close-octagon</v-icon>
										<v-card-text>
											{{ signUpErrorMessage }}
										</v-card-text>
									</div>
									<div class="messageCard" v-if="showSignUpSuccessMessage">
										<v-icon class="successIcon" left>
											mdi-checkbox-marked-circle-outline
										</v-icon>
										<v-card-text class="successMessage">
											{{ signUpSuccessMessage }}
										</v-card-text>
									</div>
								</v-container>
							</v-container>
						</v-card>
					</v-tab-item>
				</v-tabs>
			</div>
		</v-app>
	</div>
</template>

<style scoped>
.login-wrapper {
	background: dimgray;
	background: dimgray;
	margin-right: auto;
}

.login-btn {
	width: 50%;
}

.login-message {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.login-container {
	padding: 5% 10%;
	display: flex;
	flex-direction: column;
	align-content: center;
}

.sounder-end {
	color: var(--v-primary-base);
}

.v-application .title {
	font-family: 'Audiowide', cursive !important;
}

.messageCard {
	margin-top: 10%;
	text-align: center;
}

.errorIcon {
	color: red;
}

.successIcon {
	color: green;
}

@media only screen and (min-width: 600px) {
	.login-wrapper {
		width: 350px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100px;
		border-radius: 50px;
	}
}

@media only screen and (max-width: 600px) {
	.login-wrapper {
		width: 80%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 10%;
	}
}
</style>

<script>
import { mapActions } from 'vuex';
import router from '@/router';
import Vue from 'vue';

export default {
	name: 'Login',
	data() {
		return {
			showLoginErrorMessage: false,
			showSignUpErrorMessage: false,
			showSignUpSuccessMessage: false,
			loginEnable: false,
			signUpEnable: false,
			signUpSuccessMessage: '',
			signUpErrorMessage: '',
			isLoading: false
		};
	},
	methods: {
		...mapActions([
			'loginWithCredentials',
			'getTokenInfo',
			'signUpWithCredentials',
			'setIsSessionActive',
			'getUserToken',
			'setHomeAlbums'
		]),
		async loginFlow() {
			this.isLoading = true;
			let credentials = {
				email: document.querySelector('input[name=login-email]').value,
				password: document.querySelector('input[name=login-password]').value
			};
			try {
				await this.loginWithCredentials(credentials);
				await this.getTokenInfo();
				router.push({ name: 'Home' });
				await this.setHomeAlbums();
			} catch (e) {
				if (e.response.status === 401) {
					this.isLoading = false;
					this.showSignUpSuccessMessage = false;
					this.showSignUpErrorMessage = false;
					this.showLoginErrorMessage = true;
				}
			}
		},
		async signUpFlow() {
			this.isLoading = true;
			let credentials = {
				name: document.querySelector('input[name=signIn-name]').value,
				email: document.querySelector('input[name=signIn-email]').value,
				password: document.querySelector('input[name=signIn-password]').value
			};

			if (this.validateEmail(credentials.email)) {
				try {
					await this.signUpWithCredentials(credentials);
					this.isLoading = false;
					this.signUpSuccessMessage =
						'Welcome ' +
						credentials.name +
						' ! Log in to Sounder to experience true Music.';
					this.showSignUpSuccessMessage = true;
				} catch (e) {
					if (e.response.status === 401) {
						this.isLoading = false;
						this.signUpErrorMessage =
							'The email you’ve entered is already used, please choose another one.';
						this.showSignUpErrorMessage = true;
					}
				}
			} else {
				this.isLoading = false;
				this.signUpErrorMessage =
					'The email you have entered is invalid. Please, use a valid email format';
				this.showSignUpErrorMessage = true;
			}
		},
		checkLogin() {
			this.showSignUpErrorMessage = false;
			this.showLoginErrorMessage = false;
			this.showSignUpSuccessMessage = false;
			this.loginEnable =
				document.querySelector('input[name=login-email]').value.trim() !== '' &&
				document.querySelector('input[name=login-password]').value.trim() !==
					'';
		},
		checkSingUp() {
			this.showSignUpErrorMessage = false;
			this.showLoginErrorMessage = false;
			this.showSignUpSuccessMessage = false;
			this.signUpEnable =
				document.querySelector('input[name=signIn-name]').value.trim() !== '' &&
				document.querySelector('input[name=signIn-email]').value.trim() !==
					'' &&
				document.querySelector('input[name=signIn-password]').value.trim() !==
					'';
		},
		validateEmail(email) {
			const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	},
	async created() {
		this.isLoading = false;
		if (Vue.$cookies.get('UBEAT_user')) {
			this.setIsSessionActive(true);
			router.push({ name: 'Home' });
		} else {
			this.setIsSessionActive(false);
		}
	}
};
</script>
