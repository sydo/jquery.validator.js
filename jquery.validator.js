$.fn.validate = function(options){

	var defaultOptions = {
		className:			'required',
		alertError:			true,
		alertErrorMessage:	'Please fill in every required field.',
		errorClass:			'error',
		clearErrors:		function($form, errorClass) {
			$form.find('*').removeClass(errorClass);
		},
		errorFunction:		function($element, errorClass) {
			switch($element.prop('tagName')) {
				case 'INPUT':
					switch($element.attr('type')) {
						case 'text':
						case 'password':
						case 'radio':
						case 'checkbox':
							$element.closest('td').addClass(errorClass);
						break;
					}
				break;
				case 'TEXTAREA':
					$element.closest('td').addClass(errorClass);
				break;
				case 'SELECT':
					$element.closest('td').addClass(errorClass);
				break;
			}
		}
	};

	return this.each(function() {
        var settings = $.extend(defaultOptions, options);
		var $form = $(this);

		$form.submit(function(){
			var errors = [];
			var radioNames = [];
			var checkboxNames = [];

			$form.find("input[type=radio]." + settings.className).each(function(){
				var name = $(this).attr("name");
				if ($.inArray(name, radioNames) == -1) radioNames.push(name);
			});

			$form.find("input[type=checkbox]." + settings.className).each(function(){
				var name = $(this).attr("name");
				if ($.inArray(name, checkboxNames) == -1) checkboxNames.push(name);
			});

			$form.find('.' + settings.className).each(function(){
				var $element = $(this);
				switch($element.prop('tagName')) {
					case 'INPUT':
						switch($element.attr('type')) {
							case 'text':
							case 'password':
								if($element.val() == '') {
									errors.push($element);
								}
							break;
							case 'radio':
								if ($element.is(':checked')) radioNames.splice($element.attr('name'), 1);
							break;
							case 'checkbox':
								if ($element.is(':checked')) checkboxNames.splice($element.attr('name'), 1);
							break;
						}
					case 'TEXTAREA':
						if($element.val() == '') {
							errors.push($element);
						}
					break;
					case 'SELECT':
						if($element.val() == '') {
							errors.push($element);
						}
					break;
				}
			});

			for (var i = 0; i < radioNames.length; i++) {
				var $element = $form.find('input[name="' + radioNames[i] + '"]');
				errors.push($element);
			}

			for (var i = 0; i < checkboxNames.length; i++) {
				var $element = $form.find('input[name="' + checkboxNames[i] + '"]');
				errors.push($element);
			}

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