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
		<StyledLink text="Login" link="/login" />
	</div>

	<FlexContainer extensible={false} styling="h-1/5">
		<StyledTitle text="Admin dashboard" />
		<StyledText text="Sign up" />
	</FlexContainer>

	<FlexContainer extensible={false} styling="h-3/5">
		<form method="POST" action="?/signup" class="flex flex-1 flex-col justify-evenly">
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
			<StyledButton text="Sign up" />
		</form>

		{#if form?.message}
			<div class="fixed bottom-4">
				<StyledError text={form.message} />
			</div>
		{/if}
	</FlexContainer>
</FlexContainer>
