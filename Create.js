(function () {
    $(function () {

        var _vehicleService = abp.services.app.vehicle;
        var _$panel = $('#panelRegistro');
        var _$modaltrade = $('#CreateTrade');
        var _$modalmodels = $('#CreateModels');
        var _$modalbody = $('#CreateBody');
        var _$modalclass = $('#CreateClass');

        var _$bodies = $('#bodyvehicle');
        var _$Classes = $('#ClaseVehicular');
        var _$trades = $('#trademark');
        var _$models = $('#models');

        var vm = this;
        var _$form = _$panel.find('form');
        var _$formtrade = _$modaltrade.find('form');
        var _$formmodels = _$modalmodels.find('form');
        var _$formbody = _$modalbody.find('form');
        var _$formclass = _$modalclass.find('form');

        _$form.validate();
        _$formtrade.validate();
        _$formmodels.validate();
        _$formbody.validate();
        _$formclass.validate();
        //Post values data for Vehicle
        _$form.find('button[type="submit"]').click(function (e) {
            e.preventDefault();

            if (!_$form.valid()) {
                return;
            }
            var vehicle = _$form.serializeFormToObject();
            abp.ui.setBusy(_$panel);
            _vehicleService.insertCard(vehicle).done(function () {
                window.location.href = '/vehicle/index';
            }).always(function () {
                abp.ui.clearBusy(_$panel);
            });
        });
        //Get data for Trade/Models
        $("#trademark").change(function () {
            vm.loadModels($(this).val());
        });

        //Get data for Titular
        $("#btn-propietario").click(function (event) {
            var dni = $("#dni").val();
            event.preventDefault();
            if (dni == "") {
                abp.notify.error("Ingrese placa a Buscar!", "- eInspection -");
                return;
            }
            vm.loadtitular(dni, true);
        });
        //Post values data for Vehicle/trade
        _$modaltrade.on('shown.bs.modal', function () {
            $(_$formtrade)[0].reset();
            _$modaltrade.find('input:not([type=hidden]):first').focus();
        });
        _$formtrade.find('button[type="submit"]').click(function (e) {
            e.preventDefault();
            if (!_$formtrade.valid()) {
                return;
            }
            var trades = _$formtrade.serializeFormToObject();
            abp.ui.setBusy(_$modaltrade);
            _vehicleService.createTrades(trades).done(function () {
                _$modaltrade.modal('hide');
                vm.loadTrades();
            }).always(function () {
                abp.ui.clearBusy(_$modaltrade);
            });
        });
        //Post values data for Vehicle/models
        _$modalmodels.on('shown.bs.modal', function () {
            $(_$formmodels)[0].reset();
            var trade = $("#trademark").val();
            var tradename = $("#trademark :selected").text();
            $("#trades_id").val(trade);
            $("#trades_Descripcion").val(tradename);
            _$modalmodels.find('input:not([type=hidden]):first').focus();
        });
        _$formmodels.find('button[type="submit"]').click(function (e) {
            e.preventDefault();
            if (!_$formmodels.valid()) {
                return;
            }
            var models = _$formmodels.serializeFormToObject();
            abp.ui.setBusy(_$modalmodels);
            _vehicleService.createModels(models).done(function () {
                _$modalmodels.modal('hide');
                vm.loadModels(models.trades_id);
            }).always(function () {
                abp.ui.clearBusy(_$modalmodels);
            });
        });

        //Post values data for Vehicle/body
        _$modalbody.on('shown.bs.modal', function () {
            $(_$formbody)[0].reset();
            _$modalbody.find('input:not([type=hidden]):first').focus();
        });
        _$formbody.find('button[type="submit"]').click(function (e) {
            e.preventDefault();
            if (!_$formbody.valid()) {
                return;
            }
            var bodies = _$formbody.serializeFormToObject();
            abp.ui.setBusy(_$modalbody);
            _vehicleService.createBody(bodies).done(function () {
                _$modalbody.modal('hide');
                vm.loadBodyVehicle();
            }).always(function () {
                abp.ui.clearBusy(_$modalbody);
            });
        });

        //Post values data for Vehicle/class
        _$modalclass.on('shown.bs.modal', function () {
            $(_$formclass)[0].reset();
            _$modalclass.find('input:not([type=hidden]):first').focus();
        });
        _$formclass.find('button[type="submit"]').click(function (e) {
            e.preventDefault();
            if (!_$formclass.valid()) {
                return;
            }
            var classes = _$formclass.serializeFormToObject();
            abp.ui.setBusy(_$modalclass);
            _vehicleService.createClassVehicular(classes).done(function () {
                _$modalclass.modal('hide');
                vm.loadClassVehicle();
            }).always(function () {
                abp.ui.clearBusy(_$modalclass);
            });
        });

        vm.loadModels = function (id) {
            abp.ui.setBusy(null, _vehicleService.getModels({ Trades_Id: id }).done(function (data) {
                _$models.empty();
                $.each(data.items, function (i, item) {
                    _$models.append($('<option>', {
                        value: item.id,
                        text: item.description
                    }));
                });
            })
            );
        };
        vm.loadClassVehicle = function () {
            abp.ui.setBusy(null, _vehicleService.getClassVehicle().done(function (data) {
                _$classvhicles.empty();
                $.each(data.items, function (i, item) {
                    _$classvhicles.append($('<option>', {
                        value: item.id,
                        text: item.description
                    }));
                });
            })
            );
        };
        vm.loadTrades = function () {
            abp.ui.setBusy(null, _vehicleService.getTrades().done(function (data) {
                _$trades.empty();
                $.each(data.items, function (i, item) {
                    _$trades.append($('<option>', {
                        value: item.id,
                        text: item.description
                    }));
                });
            })
            );
        };
        vm.loadBodyVehicle = function () {
            abp.ui.setBusy(null, _vehicleService.getBodyVehicle().done(function (data) {
                _$bodies.empty();
                $.each(data.items, function (i, item) {
                    _$bodies.append($('<option>', {
                        value: item.id,
                        text: item.description
                    }));
                });
            })
            );
        };
        vm.loadtitular = function (data, flag) {
            abp.ui.setBusy(null, _vehicleService.searchTitular({ description: data, flag: flag }).done(function (data) {
                if (data != null) {
                    abp.notify.success("Se ha encontrado a [" + data.name + "]", "- eInspection -");
                    $('#titular').val(data.name);
                    $('#direccion').val(data.address);
                    $('#telefono').val(data.phone);
                    $('#email').val(data.email);
                }
                else {
                    $('#titular').val("");
                    $('#direccion').val("");
                    $('#telefono').val("");
                    $('#email').val("");
                    abp.notify.warn("No se ha encontrado resultados!", "- eInspection -");
                }
            }).always(function () {
                abp.ui.clearBusy(_$panel);
            })
            );
        };
    });
})();
