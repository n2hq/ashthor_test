/**
 * Universal phone number formatter
 * 
 * @param {string|number} phone - The phone number to format
 * @param {string} countryCode - ISO country code (e.g., 'US', 'GB', 'NG', 'IN')
 * @param {Object} options - Formatting options
 * @returns {string} Formatted phone number
 */



export type ConfigType = {
    format: string
    includeCountryCode: boolean
    trim: boolean
    fallback: string
}

function formatPhoneNumber(phone: string, countryCode = 'US', options = {}) {
    // Default options
    const defaultOptions = {
        format: 'international', // 'international', 'national', 'local', 'e164'
        includeCountryCode: true,
        trim: true,
        fallback: phone // Return original if formatting fails
    };

    const config = { ...defaultOptions, ...options };

    // Convert to string and clean
    let phoneStr = String(phone).trim();

    // Remove all non-digit characters except leading +
    phoneStr = phoneStr.replace(/[^\d+]/g, '');

    // If empty, return fallback
    if (!phoneStr || phoneStr === '+') {
        return config.fallback;
    }

    // Handle E.164 format (starts with +)
    if (phoneStr.startsWith('+')) {
        return formatE164(phoneStr, config);
    }

    // Format based on country code
    return formatByCountry(phoneStr, countryCode.toUpperCase(), config);
}

// Helper: Format E.164 number
function formatE164(phone: string, config: ConfigType) {
    const digits = phone.replace(/\D/g, '');

    if (config.format === 'e164') {
        return `+${digits}`;
    }

    // Determine country code from first few digits
    const countryCodes = {
        '1': 'US', '44': 'GB', '91': 'IN', '234': 'NG',
        '61': 'AU', '33': 'FR', '49': 'DE', '81': 'JP'
    };

    // Find matching country code
    let country = 'US';
    for (const [code, countryName] of Object.entries(countryCodes)) {
        if (digits.startsWith(code)) {
            country = countryName;
            break;
        }
    }

    // Remove country code for national formatting
    const localDigits = digits.replace(/^\d+/, '');
    return formatByCountry(localDigits, country, config);
}

// Helper: Format by specific country
function formatByCountry(phone: string, countryCode: string, config: any) {
    const digits = phone.replace(/\D/g, '');

    // Country-specific formatting rules
    const formats = {
        // United States/Canada
        'US': (d: string) => {
            if (d.length === 10) {
                return config.includeCountryCode && config.format === 'international'
                    ? `+1 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
                    : `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
            }
            if (d.length === 11 && d.startsWith('1')) {
                return config.format === 'international'
                    ? `+1 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`
                    : `(${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
            }
            return d;
        },

        // United Kingdom
        'GB': (d: string) => {
            if (d.length === 10) {
                return config.includeCountryCode && config.format === 'international'
                    ? `+44 ${d.slice(0, 4)} ${d.slice(4)}`
                    : `${d.slice(0, 4)} ${d.slice(4)}`;
            }
            if (d.length === 11 && d.startsWith('0')) {
                const local = d.slice(1);
                return config.includeCountryCode && config.format === 'international'
                    ? `+44 ${local.slice(0, 4)} ${local.slice(4)}`
                    : `${local.slice(0, 4)} ${local.slice(4)}`;
            }
            return d;
        },

        // Nigeria
        'NG': (d: string) => {
            if (d.length === 10) {
                return config.includeCountryCode && config.format === 'international'
                    ? `+234 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`
                    : `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
            }
            if (d.length === 11 && d.startsWith('0')) {
                const local = d.slice(1);
                return config.includeCountryCode && config.format === 'international'
                    ? `+234 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`
                    : `${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
            }
            return d;
        },

        // India
        'IN': (d: string) => {
            if (d.length === 10) {
                return config.includeCountryCode && config.format === 'international'
                    ? `+91 ${d.slice(0, 5)} ${d.slice(5)}`
                    : `${d.slice(0, 5)} ${d.slice(5)}`;
            }
            if (d.length === 11 && d.startsWith('0')) {
                const local = d.slice(1);
                return config.includeCountryCode && config.format === 'international'
                    ? `+91 ${local.slice(0, 5)} ${local.slice(5)}`
                    : `${local.slice(0, 5)} ${local.slice(5)}`;
            }
            return d;
        },

        // Default formatter (returns cleaned number)
        'DEFAULT': (d: string) => d
    };

    // Get formatter or use default
    const formatter = (formats as any)[countryCode] || formats.DEFAULT;
    const formatted = formatter(digits);

    // Apply final formatting based on options
    switch (config.format) {
        case 'e164':
            return `+${digits}`;
        case 'international':
            return formatted.startsWith('+') ? formatted : `+${digits}`;
        case 'national':
            return formatted;
        case 'local':
            // Remove country code if present
            return formatted.replace(/^\+\d+\s*/, '').replace(/^0/, '');
        default:
            return formatted;
    }
}

// Add country detection based on number
formatPhoneNumber.detectCountry = function (phone: string) {
    const digits = String(phone).replace(/\D/g, '');

    const countryPrefixes = {
        '1': 'US', '1242': 'BS', '1246': 'BB', '1264': 'AI', '1268': 'AG',
        '1284': 'VG', '1340': 'VI', '1441': 'BM', '1473': 'GD', '1649': 'TC',
        '1664': 'MS', '1670': 'MP', '1671': 'GU', '1684': 'AS', '1758': 'LC',
        '1767': 'DM', '1784': 'VC', '1787': 'PR', '1809': 'DO', '1829': 'DO',
        '1849': 'DO', '1868': 'TT', '1869': 'KN', '1876': 'JM', '1939': 'PR',
        '20': 'EG', '211': 'SS', '212': 'MA', '213': 'DZ', '216': 'TN',
        '218': 'LY', '220': 'GM', '221': 'SN', '222': 'MR', '223': 'ML',
        '224': 'GN', '225': 'CI', '226': 'BF', '227': 'NE', '228': 'TG',
        '229': 'BJ', '230': 'MU', '231': 'LR', '232': 'SL', '233': 'GH',
        '234': 'NG', '235': 'TD', '236': 'CF', '237': 'CM', '238': 'CV',
        '239': 'ST', '240': 'GQ', '241': 'GA', '242': 'CG', '243': 'CD',
        '244': 'AO', '245': 'GW', '246': 'IO', '247': 'AC', '248': 'SC',
        '249': 'SD', '250': 'RW', '251': 'ET', '252': 'SO', '253': 'DJ',
        '254': 'KE', '255': 'TZ', '256': 'UG', '257': 'BI', '258': 'MZ',
        '260': 'ZM', '261': 'MG', '262': 'RE', '263': 'ZW', '264': 'NA',
        '265': 'MW', '266': 'LS', '267': 'BW', '268': 'SZ', '269': 'KM',
        '27': 'ZA', '290': 'SH', '291': 'ER', '297': 'AW', '298': 'FO',
        '299': 'GL', '30': 'GR', '31': 'NL', '32': 'BE', '33': 'FR',
        '34': 'ES', '350': 'GI', '351': 'PT', '352': 'LU', '353': 'IE',
        '354': 'IS', '355': 'AL', '356': 'MT', '357': 'CY', '358': 'FI',
        '359': 'BG', '36': 'HU', '370': 'LT', '371': 'LV', '372': 'EE',
        '373': 'MD', '374': 'AM', '375': 'BY', '376': 'AD', '377': 'MC',
        '378': 'SM', '379': 'VA', '380': 'UA', '381': 'RS', '382': 'ME',
        '383': 'XK', '385': 'HR', '386': 'SI', '387': 'BA', '389': 'MK',
        '39': 'IT', '40': 'RO', '41': 'CH', '42': 'CZ', '43': 'AT',
        '44': 'GB', '45': 'DK', '46': 'SE', '47': 'NO', '48': 'PL',
        '49': 'DE', '51': 'PE', '52': 'MX', '53': 'CU', '54': 'AR',
        '55': 'BR', '56': 'CL', '57': 'CO', '58': 'VE', '60': 'MY',
        '61': 'AU', '62': 'ID', '63': 'PH', '64': 'NZ', '65': 'SG',
        '66': 'TH', '81': 'JP', '82': 'KR', '84': 'VN', '86': 'CN',
        '90': 'TR', '91': 'IN', '92': 'PK', '93': 'AF', '94': 'LK',
        '95': 'MM', '98': 'IR', '420': 'CZ',
        '421': 'SK', '423': 'LI', '500': 'FK', '501': 'BZ', '502': 'GT',
        '503': 'SV', '504': 'HN', '505': 'NI', '506': 'CR', '507': 'PA',
        '508': 'PM', '509': 'HT', '590': 'GP', '591': 'BO', '592': 'GY',
        '593': 'EC', '594': 'GF', '595': 'PY', '596': 'MQ', '597': 'SR',
        '598': 'UY', '599': 'CW', '670': 'TL', '672': 'NF', '673': 'BN',
        '674': 'NR', '675': 'PG', '676': 'TO', '677': 'SB', '678': 'VU',
        '679': 'FJ', '680': 'PW', '681': 'WF', '682': 'CK', '683': 'NU',
        '685': 'WS', '686': 'KI', '687': 'NC', '688': 'TV', '689': 'PF',
        '690': 'TK', '691': 'FM', '692': 'MH', '850': 'KP', '852': 'HK',
        '853': 'MO', '855': 'KH', '856': 'LA', '880': 'BD', '886': 'TW',
        '960': 'MV', '961': 'LB', '962': 'JO', '963': 'SY', '964': 'IQ',
        '965': 'KW', '966': 'SA', '967': 'YE', '968': 'OM', '970': 'PS',
        '971': 'AE', '972': 'IL', '973': 'BH', '974': 'QA', '975': 'BT',
        '976': 'MN', '977': 'NP', '992': 'TJ', '993': 'TM', '994': 'AZ',
        '995': 'GE', '996': 'KG', '998': 'UZ'
    };

    for (const [prefix, country] of Object.entries(countryPrefixes)) {
        if (digits.startsWith(prefix)) {
            return country;
        }
    }

    return 'US'; // Default
};

// Export for ES6 modules
export default formatPhoneNumber;

// Usage examples:
/*
// Basic usage
formatPhoneNumber('1234567890', 'US'); // (123) 456-7890
formatPhoneNumber('2348012345678', 'NG'); // +234 801 234 5678

// With options
formatPhoneNumber('1234567890', 'US', { 
  format: 'international' 
}); // +1 (123) 456-7890

formatPhoneNumber('08012345678', 'NG', {
  format: 'local',
  includeCountryCode: false
}); // 801 234 5678

// Auto-detect country
const detected = formatPhoneNumber.detectCountry('+2348012345678');
formatPhoneNumber('08012345678', detected);

// E.164 format
formatPhoneNumber('1234567890', 'US', { format: 'e164' }); // +11234567890
*/