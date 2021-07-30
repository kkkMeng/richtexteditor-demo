/* eslint-disable */
export const sendTrackEvent = (category, action = category, opt_label = null, opt_value = null) =>
    _hmt.push(['_trackEvent', category, action, opt_value]);

export const sendTrackPageview = pageUrl => _hmt.push(['_trackPageview', pageUrl]);

export const setCustomVar = (index, name, value, opt_scope) =>
    _hmt.push(['_setCustomVar', index, name, value, opt_scope]);

export const setAccount = siteId => _hmt.push(['_setAccount', siteId]);

export const setAutoPageview = autoPageview => _hmt.push(['_setAutoPageview', autoPageview]);

export function debounce(category, action) {
    let timer;
    return v => {
        clearTimeout(timer);
        timer = setTimeout(() => sendTrackEvent(category, action, 'content', v), 1500);
    };
}