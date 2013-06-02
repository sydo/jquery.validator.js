$.fn.validate = function(options){

	var defaultOptions = {
		className:			'required',
		indicator:			'<span style="color: red">*</span>',
		alertError:			true,
		alertErrorMessage:	'Please fill in every required field.',
		errorClass:			'error',
		addIndicator:		function($element) {
								var id = $element.attr('id');
								$('label[for=' + id + ']').append(defaultOptions['indicator']);
							},
		clearErrors:		function() {
								$('*').removeClass('error');
							},
		errorFunction:		function($element) {
								$element.addClass(defaultOptions.errorClass);
							}

	};

	return this.each(function() {
        var settings = $.extend(defaultOptions, options);
		var $form = $(this);

		$form.find('.' + settings.className).each(function(){
			settings['addIndicator']($(this));
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

			settings.clearErrors();

			if (errors.length > 0) {
				for(var i = 0; i < errors.length; i++) {
					settings.errorFunction(errors[i]);
				}
				if(settings.alertError) {
					alert(settings.alertErrorMessage);
				}
				return false;
			} else return true;

		});

    });
}