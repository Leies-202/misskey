<template>
<div class="header" :class="navbar" :style="{'box-shadow': '0 0px 8px rgba(0, 0, 0, 0.2)'}">
	<div class="main" ref="main">
		<div class="backdrop"></div>
		<div class="main">
			<div class="container" ref="mainContainer">
				<div class="left">
					<x-nav/>
				</div>
				<div class="center">
					<div class="icon" @click="goToTop">
						<img svg-inline src="../../assets/header-icon.svg"/>
					</div>
				</div>
				<div class="right">
					<x-search/>
					<x-account v-if="$store.getters.isSignedIn"/>
					<x-messaging v-if="$store.getters.isSignedIn"/>
					<x-notifications v-if="$store.getters.isSignedIn"/>
					<x-post v-if="$store.getters.isSignedIn"/>
					<x-clock v-if="$store.state.settings.showClockOnHeader" class="clock"/>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '../../../i18n';
import { env } from '../../../config';

import XNav from './ui.header.nav.vue';
import XSearch from './ui.header.search.vue';
import XAccount from './ui.header.account.vue';
import XNotifications from './ui.header.notifications.vue';
import XPost from './ui.header.post.vue';
import XClock from './ui.header.clock.vue';
import XMessaging from './ui.header.messaging.vue';

export default Vue.extend({
	i18n: i18n(),
	components: {
		XNav,
		XSearch,
		XAccount,
		XNotifications,
		XMessaging,
		XPost,
		XClock
	},

	data() {
		return {
			env: env
		};
	},

	computed: {
		navbar(): string {
			return this.$store.state.device.navbar;
		},
	},

	mounted() {
		this.$store.commit('setUiHeaderHeight', this.$el.offsetHeight);
	},

	methods: {
		goToTop() {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}
	},
});
</script>

<style lang="stylus" scoped>
.header
	position fixed
	z-index 1000
	width 100%

	&.top
		top 0

	&.bottom
		bottom 0

	&.top
		> .main
			> .backdrop
				background var(--desktopHeaderBg)

	&.bottom
		> .main
			> .backdrop
				background var(--secondary)

	> .warn
		display block
		margin 0
		padding 4px
		text-align center
		font-size 12px
		background #f00
		color #fff

	> .main
		height 48px

		> .backdrop
			position absolute
			top 0
			z-index 1000
			width 100%
			height 48px

		> .main
			z-index 1001
			margin 0
			padding 0
			background-clip content-box
			font-size 0.9rem
			user-select none

			> .container
				display flex
				width 100%
				max-width 1208px
				margin 0 auto

				> *
					position absolute
					height 48px

				> .center
					right 0

					> .icon
						margin auto
						display block
						width 48px
						text-align center
						cursor pointer
						opacity 0.5

						> svg
							width 24px
							height 48px
							vertical-align top
							fill var(--desktopHeaderFg)

				> .left,
				> .center
					left 0

				> .right
					right 0

					> *
						display inline-block
						vertical-align top

					@media (max-width 1100px)
						> .clock
							display none

</style>
