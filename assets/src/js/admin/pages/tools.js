( function( $ ) {
	const $doc = $( document );
	let isRunning = false;

	const installSampleCourse = function installSampleCourse( e ) {
		e.preventDefault();

		const $button = $( this );

		if ( isRunning ) {
			return;
		}

		if ( ! confirm( lpGlobalSettings.i18n.confirm_install_sample_data ) ) {
			return;
		}

		$button.addClass( 'disabled' ).html( $button.data( 'installing-text' ) );
		$( '.lp-install-sample__response' ).remove();
		isRunning = true;

		$.ajax( {
			url: $button.attr( 'href' ),
			data: $( '.lp-install-sample__options' ).serializeJSON(),
			success( response ) {
				$button.removeClass( 'disabled' ).html( $button.data( 'text' ) );
				isRunning = false;
				$( response ).insertBefore( $button.parent() );
			},
			error() {
				$button.removeClass( 'disabled' ).html( $button.data( 'text' ) );
				isRunning = false;
				$( response ).insertBefore( $button.parent() );
			},
		} );
	};

	const uninstallSampleCourse = function uninstallSampleCourse( e ) {
		e.preventDefault();

		const $button = $( this );

		if ( isRunning ) {
			return;
		}

		if ( ! confirm( lpGlobalSettings.i18n.confirm_uninstall_sample_data ) ) {
			return;
		}

		$button.addClass( 'disabled' ).html( $button.data( 'uninstalling-text' ) );
		isRunning = true;

		$.ajax( {
			url: $button.attr( 'href' ),
			success( response ) {
				$button.removeClass( 'disabled' ).html( $button.data( 'text' ) );
				isRunning = false;
				$( response ).insertBefore( $button.parent() );
			},
			error() {
				$button.removeClass( 'disabled' ).html( $button.data( 'text' ) );
				isRunning = false;
				$( response ).insertBefore( $button.parent() );
			},
		} );
	};

	const clearHardCache = function clearHardCache( e ) {
		e.preventDefault();
		const $button = $( this );

		if ( $button.hasClass( 'disabled' ) ) {
			return;
		}

		$button.addClass( 'disabled' ).html( $button.data( 'cleaning-text' ) );
		$.ajax( {
			url: $button.attr( 'href' ),
			data: {},
			success( response ) {
				$button.removeClass( 'disabled' ).html( $button.data( 'text' ) );
			},
			error() {
				$button.removeClass( 'disabled' ).html( $button.data( 'text' ) );
			},
		} );
	};

	const toggleHardCache = function toggleHardCache() {
		$.ajax( {
			url: 'admin.php?page=lp-toggle-hard-cache-option',
			data: { v: this.checked ? 'yes' : 'no' },
			success( response ) {
			},
			error() {
			},
		} );
	};

	const toggleOptions = function toggleOptions( e ) {
		e.preventDefault();
		$( '.lp-install-sample__options' ).toggleClass( 'hide-if-js' );
	};

	let elLPOverlay;
	const lpModalOverlay = {
		elMainContent: null,
		elTitle: null,
		elBtnYes: null,
		elBtnNo: null,
		elFooter: null,
		elCalledModal: null,
		callBackYes: null,
		init() {
			const lpModalOverlay = this;
			this.elMainContent = elLPOverlay.find( '.main-content' );
			this.elTitle = elLPOverlay.find( '.modal-title' );
			this.elBtnYes = elLPOverlay.find( '.btn-yes' );
			this.elBtnNo = elLPOverlay.find( '.btn-no' );
			this.elFooter = elLPOverlay.find( '.lp-modal-footer' );

			$( document ).on( 'click', '.close, .btn-no', function() {
				elLPOverlay.hide();
			} );

			$( document ).on( 'click', '.btn-yes', function() {
				lpModalOverlay.callBackYes();
			} );
		},
		setElCalledModal( elCalledModal ) {
			this.elCalledModal = elCalledModal;
		},
		setContentModal( content, event ) {
			this.elMainContent.html( content );
			if ( 'function' === typeof event ) {
				event();
			}
		},
		setTitleModal( content ) {
			this.elTitle.html( content );
		},
	};

	const upgradeDB = function upgradeDB() {
		elLPOverlay.show();

		const elToolUpgradeDB = $( '#lp-tool-upgrade-db' );
		const elWrapperTermsUpgrade = elToolUpgradeDB.find( '.wrapper-terms-upgrade' );
		const elStatusUpgrade = elToolUpgradeDB.find( '.wrapper-lp-status-upgrade' );
		const elWrapperUpgradeMessage = elToolUpgradeDB.find( '.wrapper-lp-upgrade-message' );

		if ( ! elToolUpgradeDB.length ) {
			return;
		}

		let checkValidBeforeUpgrade = null;

		if ( elWrapperTermsUpgrade.length ) { // Show Terms Upgrade.
			lpModalOverlay.setContentModal( elWrapperTermsUpgrade.html() );

			const elTermUpdate = elLPOverlay.find( '.terms-upgrade' );
			const elLPAgreeTerm = elTermUpdate.find( 'input[name=lp-agree-term]' );
			const elTermMessage = elTermUpdate.find( '.error' );
			const elMessageUpgrading = $( 'input[name=message-when-upgrading]' ).val();

			checkValidBeforeUpgrade = function() {
				elTermMessage.hide();
				elTermMessage.removeClass( 'learn-press-message' );

				if ( elLPAgreeTerm.is( ':checked' ) ) {
					lpModalOverlay.elFooter.find( '.learn-press-notice' ).remove();
					lpModalOverlay.elFooter.prepend( '<span class="learn-press-notice">' + elMessageUpgrading + '</span>' );
					lpModalOverlay.setContentModal( elStatusUpgrade.html() );

					return true;
				}

				elTermMessage.show();
				elTermMessage.addClass( 'learn-press-message' );
				lpModalOverlay.elMainContent.animate( {
					scrollTop: elTermMessage.offset().top,
				} );

				return false;
			};
		} else { // Show Steps Upgrade.
			lpModalOverlay.setContentModal( elStatusUpgrade.html() );
			checkValidBeforeUpgrade = function() {
				return true;
			};
		}

		lpModalOverlay.setTitleModal( elToolUpgradeDB.find( 'h2' ).html() );
		lpModalOverlay.elBtnYes.text( 'Upgrade' );
		lpModalOverlay.elBtnYes.show();
		lpModalOverlay.elBtnNo.text( 'close' );
		lpModalOverlay.callBackYes = function() {
			if ( ! checkValidBeforeUpgrade() ) {
				return;
			}

			lpModalOverlay.elBtnYes.hide();
			lpModalOverlay.elBtnNo.hide();

			const urlHandle = '/lp/v1/database/upgrade';
			const elGroupStep = elLPOverlay.find( '.lp-group-step' );
			const elItemSteps = elLPOverlay.find( '.lp-item-step' );

			// Get params.
			const steps = [];

			$.each( elItemSteps, function( i, el ) {
				const elItemStepsTmp = $( el );

				if ( ! elItemStepsTmp.hasClass( 'completed' ) ) {
					const step = elItemStepsTmp.find( 'input' ).val();
					steps.push( step );
				}
			} );

			const params = {
				steps,
				step: steps[ 0 ],
			};

			// Show progress when upgrading.
			const showProgress = ( stepCurrent, percent ) => {
				elItemStepCurrent = elGroupStep.find( 'input[value=' + stepCurrent + ']' ).closest( '.lp-item-step' );
				elItemStepCurrent.addClass( 'running' );

				if ( 100 === percent ) {
					elItemStepCurrent.removeClass( 'running' ).addClass( 'completed' );
				}

				elItemStepCurrent.find( '.progress-bar' ).css( 'width', percent + '%' );
				elItemStepCurrent.find( '.percent' ).text( percent + '%' );
			};

			// Scroll to step current.
			const scrollToStepCurrent = ( stepCurrent ) => {
				elItemStepCurrent = elGroupStep.find( 'input[value=' + stepCurrent + ']' ).closest( '.lp-item-step' );

				const offset = elItemStepCurrent.offset().top - lpModalOverlay.elMainContent.offset().top +
					lpModalOverlay.elMainContent.scrollTop();

				lpModalOverlay.elMainContent.stop().animate( {
					scrollTop: offset,
				}, 600 );
			};

			showProgress( steps[ 0 ], 0.1 );

			const funcCallBack = {
				success: ( res ) => {
					showProgress( params.step, res.percent );

					if ( params.step !== res.name ) {
						showProgress( res.name, 0.1 );
					}

					if ( 'success' === res.status ) {
						scrollToStepCurrent( params.step );
						params.step = res.name;
						params.data = res.data;

						setTimeout( () => {
							handleAjax( urlHandle, params, funcCallBack );
						}, 800 );
					} else if ( 'finished' === res.status ) {
						elItemStepCurrent.removeClass( 'running' ).addClass( 'completed' );
						setTimeout( () => {
							lpModalOverlay.setContentModal( elWrapperUpgradeMessage.html() );
						}, 1000 );
						lpModalOverlay.elFooter.find( '.learn-press-notice' ).remove();
						lpModalOverlay.elBtnNo.show();
						lpModalOverlay.elBtnNo.on( 'click', () => {
							window.location.reload();
						} );
					} else {
						lpModalOverlay.elFooter.find( '.learn-press-notice' ).remove();
						elItemStepCurrent.removeClass( 'running' ).addClass( 'error' );
						lpModalOverlay.elBtnYes.text( 'Retry' ).show();
						lpModalOverlay.setContentModal( elWrapperUpgradeMessage.html(), function() {
							lpModalOverlay.elMainContent.find( '.learn-press-message' ).addClass( 'error' ).html( res.message );
						} );
					}
				},
				error: ( err ) => {
					lpModalOverlay.setContentModal( elWrapperUpgradeMessage.html(), function() {
						lpModalOverlay.elBtnYes.text( 'Retry' ).show();
						lpModalOverlay.elBtnNo.show();
						lpModalOverlay.elMainContent.find( '.learn-press-message' ).addClass( 'error' ).html( err.message );
					} );
				},
				completed: () => {

				},
			};

			handleAjax( urlHandle, params, funcCallBack );
		};

		$( '.lp-overlay' ).css( 'display', 'block' );
	};

	const getStepsUpgradeStatus = function() {
		const elWrapperStatusUpgrade = $( '.wrapper-lp-status-upgrade' );
		const urlHandle = '/lp/v1/database/get_steps';

		const funcCallBack = {
			success: ( res ) => {
				const { steps_completed, steps_default } = res;

				if ( undefined === steps_completed || undefined === steps_default ) {
					console.log( 'invalid steps_completed and steps_default' );
					return false;
				}

				// Render show Steps.
				let htmlStep = '';
				for ( const k_gr_steps in steps_default ) {
					const step_group = steps_default[ k_gr_steps ];
					const steps = step_group.steps;

					htmlStep = '<div class="lp-group-step">';
					htmlStep += '<h3>' + step_group.label + '</h3>';

					for ( const k_step in steps ) {
						const step = steps[ k_step ];
						let completed = '';

						if ( undefined !== steps_completed[ k_step ] ) {
							completed = 'completed';
						}

						htmlStep += '<div class="lp-item-step ' + completed + '">';
						htmlStep += '<div class="lp-item-step-left"><input type="hidden" name="lp_steps_upgrade_db[]" value="' + step.name + '"  /></div>';
						htmlStep += '<div class="lp-item-step-right">';
						htmlStep += '<label for=""><strong></strong>' + step.label + '</label>';
						htmlStep += '<div class="description">' + step.description + '</div>';
						htmlStep += '<div class="percent"></div>';
						htmlStep += '<span class="progress-bar"></span>';
						htmlStep += '</div>';
						htmlStep += '</div>';
					}

					htmlStep += '</div>';

					elWrapperStatusUpgrade.append( htmlStep );

					// Show dialog upgrade database.
					const queryString = window.location.search;
					const urlParams = new URLSearchParams( queryString );
					const action = urlParams.get( 'action' );
					const elBtnUpgradeDB = $( '.lp-btn-upgrade-db' );

					// instance LP Modal Overlay.
					lpModalOverlay.init();

					elBtnUpgradeDB.on( 'click', function() {
						upgradeDB();
					} );

					if ( 'upgrade-db' === action ) {
						upgradeDB();
					}
				}
			},
			error: ( err ) => {

			},
			completed: () => {

			},
		};

		handleAjax( urlHandle, {}, funcCallBack );
	};

	const handleAjax = function( url, params, functions ) {
		wp.apiFetch( {
			path: url,
			method: 'POST',
			data: params,
		} ).then( ( res ) => {
			if ( 'function' === typeof functions.success ) {
				functions.success( res );
			}
		} ).catch( ( err ) => {
			if ( 'function' === typeof functions.error ) {
				functions.error( err );
			}
		} ).then( () => {
			if ( 'function' === typeof functions.completed ) {
				functions.completed();
			}
		} );
	};

	$( function() {
		elLPOverlay = $( '.lp-overlay' );
		getStepsUpgradeStatus();

		$doc.on( 'click', '.lp-install-sample__install', installSampleCourse )
			.on( 'click', '.lp-install-sample__uninstall', uninstallSampleCourse )
			.on( 'click', '#learn-press-clear-cache', clearHardCache )
			.on( 'click', 'input[name="enable_hard_cache"]', toggleHardCache )
			.on( 'click', '.lp-install-sample__toggle-options', toggleOptions );
	} );
}( jQuery ) );
