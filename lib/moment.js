define(['moment', 'globals', 'moment/locale/en-au'], function (moment, globals) {
    moment.locale(globals.SETTINGS.moment.locale);
    return moment;
});