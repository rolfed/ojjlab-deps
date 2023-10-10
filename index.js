var OjjApp = (function() {

function formatPhoneNumber(number) {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

// Select the element with itemprop="telephone"
let phoneElement = document.querySelector('p[itemprop="telephone"]');

// Get the phone number from the element's content
let phoneNumber = phoneElement.textContent;

// Format the phone number using regex
let formattedNumber = formatPhoneNumber(phoneNumber);

// Replace the content with a link that calls the formatted number
phoneElement.innerHTML = `<a href="tel:${phoneNumber}">${formattedNumber}</a>`;

// Address
function isAppleDevice() {
    const userAgent = navigator.userAgent;
    return /iPhone|iPod|iPad/.test(userAgent);
}

function isAndroidDevice() {
    const userAgent = navigator.userAgent;
    return /Android/.test(userAgent);
}

function isWindowsDevice() {
    const userAgent = navigator.userAgent;
    return /Windows/.test(userAgent);
}

// Extract the address details
let addressElement = document.querySelector('p[itemprop="address"]');
let streetAddress = addressElement.querySelector('[itemprop="streetAddress"]').textContent;
let locality = addressElement.querySelector('[itemprop="addressLocality"]').textContent;
let region = addressElement.querySelector('[itemprop="addressRegion"]').textContent;
let postalCode = addressElement.querySelector('[itemprop="postalCode"]').textContent;

let fullAddress = `${streetAddress}, ${locality}, ${region} ${postalCode}`;

let mapLink;

if (isAppleDevice()) {
    // Apple Maps link for iOS devices
    mapLink = `https://maps.apple.com/?address=3691%20NE%20John%20Olsen%20Ave,%20Hillsboro,%20OR%20%2097124,%20United%20States&auid=1179449429731946979&ll=45.545809,-122.880825&lsp=9902&q=Oregon%20Jiu%20Jitsu%20Lab&_ext=CjMKBQgEEOIBCgQIBRADCgUIBhCRAQoECAoQAAoECFIQAwoECFUQEAoECFkQBgoFCKQBEAESJillwi/mScVGQDFfAY2EyLhewDnjl1VCcMZGQEGxvcRc9rdewFAE`;
} else if (isAndroidDevice()) {
    // Google Maps link for Android devices
    mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
} else if (isWindowsDevice()) {
    // Bing Maps link for Windows devices
    mapLink = `https://www.bing.com/maps/?q=${encodeURIComponent(fullAddress)}`;
} else {
    // Default to Google Maps for other devices
    mapLink = `https://www.google.com/maps/place/Oregon+Jiu+Jitsu+Lab/@45.5458068,-122.8834043,17z/data=!3m1!4b1!4m6!3m5!1s0x54950f766c38f8ed:0x6ca2e3d54969fcb2!8m2!3d45.5458031!4d-122.880824!16s%2Fg%2F11krz_z6lt?entry=ttu`;
}

// Wrap the original address content in the map link while maintaining the original formatting
addressElement.innerHTML = `
    <a href="${mapLink}" target="_blank">
        <span itemprop="streetAddress">${streetAddress}</span><br>
        <span itemprop="addressLocality">${locality}</span>,
        <span itemprop="addressRegion">${region}</span>
        <span itemprop="postalCode">${postalCode}</span>
    </a>
`;

// Select the element with the class "powered"
let poweredElement = document.querySelector('li.powered');

// Get the current year
let currentYear = new Date().getFullYear();

// Create a new li element with the copyright notice and current year
let copyrightElement = document.createElement('li');
copyrightElement.innerHTML = `© ${currentYear}`;

// Replace the old li element with the new one
poweredElement.parentNode.replaceChild(copyrightElement, poweredElement);

// Select the element with the id "logo"
let logoElement = document.querySelector('a#logo');

// Change the color of the <em> element to white
let emElement = logoElement.querySelector('em');
if (emElement) {
    emElement.style.display = 'none';
}

// Add an alt attribute to the <img> tag
let imgElement = logoElement.querySelector('img');
if (imgElement) {
    imgElement.setAttribute('alt', 'Oregon Jiu Jitsu Lab');
}


});

OjjApp();

