$.fn.validate = function(options){

	var defaultOptions = {
		className:			'required',
		indicator:			'<span style="color: red">*</span>',
		alertError:			true,
		alertErrorMessage:	'Please fill in every required field.',
		errorClass:			'error',
		addIndicator:		function($form, $element, indicator) {
								var id = $element.attr('id');
								$form.find('label[for=' + id + ']').append(indicator);
							},
		clearErrors:		function($form, errorClass) {
								$form.find('*').removeClass(errorClass);
							},
		errorFunction:		function($element, errorClass) {
								$element.addClass(errorClass);
							}
	};

	return this.each(function() {
        var settings = $.extend(defaultOptions, options);
		var $form = $(this);

		$form.find('.' + settings.className).each(function(){
			settings['addIndicator']($form, $(this), settings['indicator']);
		});

		$form.submit(function(){
			var errors = [];
			$form.find('.' + settings.className).each(function(){
				var $element = $(this);
				switch($element.prop('tagName')) {
					case 'INPUT':
					case 'TEXTAREA':
						if($element.val() == '') {
							errors.push($element);
						}
					break;
				}
			});

			settings.clearErrors($form, settings.errorClass);

			if (errors.length > 0) {
				for(var i = 0; i < errors.length; i++) {
					settings.errorFunction(errors[i], settings.errorClass);
				}
				if(settings.alertError) {
					alert(settings.alertErrorMessage);
				}
				return false;
			} else return true;

		});

    });
}