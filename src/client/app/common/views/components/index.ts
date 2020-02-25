import Vue from 'vue';

import dummy from './dummy.vue';
import userName from './user-name.vue';
import followButton from './follow-button.vue';
import error from './error.vue';
import noteSkeleton from './note-skeleton.vue';
import instance from './instance.vue';
import cwButton from './cw-button.vue';
import tagCloud from './tag-cloud.vue';
import trends from './trends.vue';
import analogClock from './analog-clock.vue';
import menu from './menu.vue';
import noteHeader from './note-header.vue';
import renote from './renote.vue';
import signin from './signin.vue';
import signup from './signup.vue';
import acct from './acct.vue';
import avatar from './avatar.vue';
import nav from './nav.vue';
import misskeyFlavoredMarkdown from './misskey-flavored-markdown.vue';
import poll from './poll.vue';
import pollEditor from './poll-editor.vue';
import reactionIcon from './reaction-icon.vue';
import reactionsViewer from './reactions-viewer.vue';
import time from './time.vue';
import mediaList from './media-list.vue';
import uploader from './uploader.vue';
import streamIndicator from './stream-indicator.vue';
import ellipsis from './ellipsis.vue';
import urlPreview from './url-preview.vue';
import fileTypeIcon from './file-type-icon.vue';
import emoji from './emoji.vue';
import welcomeTimeline from './welcome-timeline.vue';
import userList from './user-list.vue';
import uiInput from './ui/input.vue';
import uiButton from './ui/button.vue';
import uiHorizonGroup from './ui/horizon-group.vue';
import uiCard from './ui/card.vue';
import uiForm from './ui/form.vue';
import uiTextarea from './ui/textarea.vue';
import uiSwitch from './ui/switch.vue';
import uiRadio from './ui/radio.vue';
import uiSelect from './ui/select.vue';
import uiInfo from './ui/info.vue';
import uiPagination from './ui/pagination.vue';
import formButton from './ui/form/button.vue';
import formRadio from './ui/form/radio.vue';

Vue.component('mfm', misskeyFlavoredMarkdown);
Vue.component('mk-dummy', dummy);
Vue.component('mk-user-name', userName);
Vue.component('mk-follow-button', followButton);
Vue.component('mk-error', error);
Vue.component('mk-note-skeleton', noteSkeleton);
Vue.component('mk-instance', instance);
Vue.component('mk-cw-button', cwButton);
Vue.component('mk-tag-cloud', tagCloud);
Vue.component('mk-trends', trends);
Vue.component('mk-analog-clock', analogClock);
Vue.component('mk-menu', menu);
Vue.component('mk-note-header', noteHeader);
Vue.component('mk-renote', renote);
Vue.component('mk-signin', signin);
Vue.component('mk-signup', signup);
Vue.component('mk-acct', acct);
Vue.component('mk-avatar', avatar);
Vue.component('mk-nav', nav);
Vue.component('mk-poll', poll);
Vue.component('mk-poll-editor', pollEditor);
Vue.component('mk-reaction-icon', reactionIcon);
Vue.component('mk-reactions-viewer', reactionsViewer);
Vue.component('mk-time', time);
Vue.component('mk-media-list', mediaList);
Vue.component('mk-uploader', uploader);
Vue.component('mk-stream-indicator', streamIndicator);
Vue.component('mk-ellipsis', ellipsis);
Vue.component('mk-url-preview', urlPreview);
Vue.component('mk-file-type-icon', fileTypeIcon);
Vue.component('mk-emoji', emoji);
Vue.component('mk-welcome-timeline', welcomeTimeline);
Vue.component('mk-user-list', userList);
Vue.component('ui-input', uiInput);
Vue.component('ui-button', uiButton);
Vue.component('ui-horizon-group', uiHorizonGroup);
Vue.component('ui-card', uiCard);
Vue.component('ui-form', uiForm);
Vue.component('ui-textarea', uiTextarea);
Vue.component('ui-switch', uiSwitch);
Vue.component('ui-radio', uiRadio);
Vue.component('ui-select', uiSelect);
Vue.component('ui-info', uiInfo);
Vue.component('ui-pagination', uiPagination);
Vue.component('form-button', formButton);
Vue.component('form-radio', formRadio);
