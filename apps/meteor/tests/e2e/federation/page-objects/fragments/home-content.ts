import type { Locator, Page } from '@playwright/test';

export class FederationHomeContent {
	protected readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	get inputMessage(): Locator {
		return this.page.locator('[name="msg"]');
	}

	get messagePopUpItems(): Locator {
		return this.page.locator('.message-popup-items');
	}

	get lastUserMessage(): Locator {
		return this.page.locator('[data-qa-type="message"]').last();
	}

	get lastUserMessageBody(): Locator {
		return this.lastUserMessage.locator('[data-qa-type="message-body"]');
	}

	get lastUserMessageNotSequential(): Locator {
		return this.page.locator('[data-qa-type="message"][data-sequential="false"]').last();
	}

	get typingIndicator(): Locator {
		return this.page.locator('.rc-message-box__activity');
	}

	async sendMessage(text: string): Promise<void> {
		await this.page.locator('[name="msg"]').type(text);
		await this.page.locator('button[aria-label="Send"]').click();
	}

	async sendMessageUsingEnter(text: string): Promise<void> {
		await this.page.locator('[name="msg"]').type(text);
		await this.page.keyboard.press('Enter');
	}

	async editLastMessage(message: string): Promise<void> {
		await this.openLastMessageMenu();
		await this.btnOptionEditMessage.click();
		await this.page.locator('[name="msg"]').fill(message);
		await this.page.keyboard.press('Enter');
	}

	async deleteLastMessage(): Promise<void> {
		await this.openLastMessageMenu();
		await this.btnOptionDeleteMessage.click();
		await this.page.locator('#modal-root dialog .rcx-modal__inner .rcx-modal__footer .rcx-button--danger').click();
	}

	async starLastMessage(): Promise<void> {
		await this.openLastMessageMenu();
		await this.btnOptionStarMessage.waitFor();
		await this.btnOptionStarMessage.click();
	}

	async replyInDm(message: string): Promise<void> {
		await this.openLastMessageMenu();
		await this.btnOptionReplyDirectly.click();
		await this.page.waitForTimeout(2000);
		await this.page.locator('[name="msg"]').fill(message);
		await this.page.keyboard.press('Enter');
	}

	async sendAudioRecordedMessage(): Promise<void> {
		await this.btnRecordAudio.click();
		await this.page.waitForTimeout(2000);
		await this.page.locator('.rc-message-box__icon.rc-message-box__audio-message-done').click();
		await this.btnModalConfirm.click();
		await this.page.waitForTimeout(5000);
	}

	async sendVideoRecordedMessage(): Promise<void> {
		await this.btnMenuMoreActions.click();
		await this.btnVideoMessage.click();
		await this.page.locator('.vrec-dialog button.record').click();
		await this.page.waitForTimeout(5000);
		await this.page.locator('.vrec-dialog button.record').click();
		await this.page.locator('.vrec-dialog button.ok').click();
		await this.btnModalConfirm.click();
	}

	async dispatchSlashCommand(text: string): Promise<void> {
		await this.page.locator('[name="msg"]').type(text);
		await this.page.locator('button[aria-label="Send"]').waitFor();
		await this.page.locator('button[aria-label="Send"]').click();
	}

	get btnModalCancel(): Locator {
		return this.page.locator('#modal-root .rcx-button-group--align-end .rcx-button--secondary');
	}

	get modalFilePreview(): Locator {
		return this.page.locator(
			'//div[@id="modal-root"]//header//following-sibling::div[1]//div//div//img | //div[@id="modal-root"]//header//following-sibling::div[1]//div//div//div//i',
		);
	}

	get btnModalConfirm(): Locator {
		return this.page.locator('#modal-root .rcx-button-group--align-end .rcx-button--primary');
	}

	get descriptionInput(): Locator {
		return this.page.locator('//div[@id="modal-root"]//fieldset//div[2]//span//input');
	}

	get getLastFileAttachmentContent(): Locator {
		return this.page.locator('.rcx-attachment__content').last();
	}

	get getLastFileName(): Locator {
		return this.page.locator('.rcx-message-attachment').last();
	}

	get fileNameInput(): Locator {
		return this.page.locator('//div[@id="modal-root"]//fieldset//div[1]//span//input');
	}

	get lastMessageFileName(): Locator {
		return this.page.locator('[data-qa-type="message"]:last-child [data-qa-type="attachment-title-link"]');
	}

	async getLastFileMessageByFileName(filename: string): Promise<Locator> {
		return this.page.locator('[data-qa-type="message"]:last-child .rcx-message-container').last().locator(`div[title="${filename}"]`);
	}

	async getLastVideoMessageFileName(filename: string): Promise<Locator> {
		return this.getLastFileMessageByFileName(filename);
	}

	get lastFileMessage(): Locator {
		return this.page.locator('[data-qa-type="message"]:last-child .rcx-message-container').last();
	}

	get waitForLastMessageTextAttachmentEqualsText(): Locator {
		return this.page.locator('[data-qa-type="message"]:last-child .rcx-attachment__details .rcx-message-body');
	}

	get btnOptionEditMessage(): Locator {
		return this.page.locator('[data-qa-id="edit-message"]');
	}

	get btnOptionDeleteMessage(): Locator {
		return this.page.locator('[data-qa-id="delete-message"]');
	}

	get btnOptionPinMessage(): Locator {
		return this.page.locator('[data-qa-id="pin-message"]');
	}

	get btnOptionStarMessage(): Locator {
		return this.page.locator('[data-qa-id="star-message"]');
	}

	get btnOptionFileUpload(): Locator {
		return this.page.locator('[data-qa-id="file-upload"]');
	}

	get btnVideoMessage(): Locator {
		return this.page.locator('.rc-popover__content [data-id="video-message"]');
	}

	get btnRecordAudio(): Locator {
		return this.page.locator('[data-qa-id="audio-record"]');
	}

	get btnMenuMoreActions() {
		return this.page.locator('[data-qa-id="menu-more-actions"]');
	}

	get linkUserCard(): Locator {
		return this.page.locator('[data-qa="UserCard"] a');
	}

	get btnContactInformation(): Locator {
		return this.page.locator('[data-qa-id="ToolBoxAction-user"]');
	}

	get btnContactEdit(): Locator {
		return this.page.locator('.rcx-vertical-bar button:has-text("Edit")');
	}

	get btnOptionReplyInThread(): Locator {
		return this.page.locator('[data-qa-id="reply-in-thread"]');
	}

	get btnOptionStartDiscussion(): Locator {
		return this.page.locator('[data-qa-id="start-discussion"]');
	}

	get btnOptionReplyDirectly(): Locator {
		return this.page.locator('[data-qa-id="reply-directly"]');
	}

	async pickEmoji(emoji: string, section = 'icon-people') {
		await this.page.locator('.rc-message-box__icon.emoji-picker-icon').click();
		await this.page.locator(`//*[contains(@class, "emoji-picker")]//*[contains(@class, "${section}")]`).click();
		await this.page.locator(`//*[contains(@class, "emoji-picker")]//*[contains(@class, "${emoji}")]`).first().click();
	}

	async sendFileMessage(fileName: string): Promise<void> {
		await this.btnMenuMoreActions.click();
		await this.btnOptionFileUpload.click();
		await this.page.locator('input[type=file]#fileupload-input').setInputFiles(`./tests/e2e/federation/files/${fileName}`);
	}

	async openLastMessageMenu(): Promise<void> {
		await this.page.locator('[data-qa-type="message"]').last().hover();
		await this.page.locator('[data-qa-type="message"]').last().locator('[data-qa-type="message-action-menu"][data-qa-id="menu"]').waitFor();
		await this.page.locator('[data-qa-type="message"]').last().locator('[data-qa-type="message-action-menu"][data-qa-id="menu"]').click();
	}

	async quoteMessage(message: string): Promise<void> {
		await this.openLastMessageMenu();
		await this.page.locator('[data-qa-id="quote-message"]').click();
		await this.page.locator('[name="msg"]').fill(message);
		await this.page.keyboard.press('Enter');
	}

	async reactToMessage(emoji: string): Promise<void> {
		await this.openLastMessageMenu();
		await this.page.locator('[data-qa-id="reaction-message"]').click();
		await this.page.locator('.js-emojipicker-search').fill(emoji);
		await this.page.locator(`[data-emoji="${emoji}"]`).last().click();
	}

	async unreactLastMessage(): Promise<void> {
		await this.page.locator('[data-qa-type="message"]').last().locator('.rcx-message-reactions__reaction').nth(1).waitFor();
		await this.page.locator('[data-qa-type="message"]').last().locator('.rcx-message-reactions__reaction').nth(1).click();
	}

	async getSystemMessageByText(text: string): Promise<Locator> {
		return this.page.locator('div[data-qa="system-message"] div[data-qa-type="system-message-body"]', { hasText: text });
	}

	async getLastSystemMessageName(): Promise<Locator> {
		return this.page.locator('div[data-qa="system-message"]:last-child span.rcx-message-system__name');
	}

	async getAllReactions(): Promise<Locator> {
		return this.page.locator('[data-qa-type="message"]').last().locator('.rcx-message-reactions__reaction');
	}
}
