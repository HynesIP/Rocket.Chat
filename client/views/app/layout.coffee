Template.appLayout.helpers

	rooms: ->
		console.log 'appLayout.helpers.rooms' if window.rocketDebug
		return ChatRoom.find {}

	flexOpened: ->
		return 'flex-opened' if Session.equals('flexOpened', true)

Template.appLayout.rendered = ->
	$('html').addClass("noscroll").removeClass "scroll"
	
	# RTL Support - Need config option on the UI
	if isRtl localStorage.getItem "userLanguage"
		$('html').addClass "rtl"
