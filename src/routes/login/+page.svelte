<script lang="ts">
	import {
		FlexContainer,
		FormField,
		StyledButton,
		StyledError,
		StyledLink,
		StyledText,
		StyledTitle
	} from '@totocorpsoftwareinc/frontend-toolkit';

	interface Props {
		form: HTMLFormElement;
	}

	let { form = $bindable() }: Props = $props();

	function resetFormError() {
		if (!form) {
			return;
		}
		form.message = '';
	}
</script>

<FlexContainer>
	<div class="fixed top-4 right-4">
		<StyledLink text="Signup" link="/signup" />
	</div>

	<FlexContainer extensible={false} styling="h-1/5">
		<StyledTitle text="Admin dashboard" />
		<StyledText text="Login" />
	</FlexContainer>

	<FlexContainer extensible={false} styling="h-3/5">
		<form method="POST" action="?/login" class="flex flex-1 flex-col justify-evenly">
			<!-- https://stackoverflow.com/questions/62278480/add-onchange-handler-to-input-in-svelte -->
			<FormField label="email:" labelId="email" labelStyling="text-secondary">
				<input
					id="email"
					type="text"
					name="email"
					placeholder="Enter your email address"
					required
					value={form?.email ?? ''}
					oninput={resetFormError}
					class="bg-white"
				/>
			</FormField>
			<FormField label="password:" labelId="password" labelStyling="text-secondary">
				<input
					id="password"
					type="text"
					name="password"
					placeholder="Enter your password"
					required
					oninput={resetFormError}
					class="bg-white"
				/></FormField
			>
			<StyledButton text="Login" />
		</form>

		{#if form?.message}
			<!-- https://www.w3schools.com/howto/howto_js_snackbar.asp -->
			<div class="fixed bottom-4">
				<StyledError text={form.message} />
			</div>
		{/if}
	</FlexContainer>
</FlexContainer>
