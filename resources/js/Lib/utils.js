export function formatRupiah(angka) {
    const number_string = String(angka).replace(/[^,\d]/g, '');
    const split = number_string.split(',');
    let sisa = split[0].length % 3;
    let rupiah = split[0].substring(0, sisa);
    const ribuan = split[0].substring(sisa).match(/\d{3}/gi);
    if (ribuan) {
        const separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    return rupiah;
}

export function parseRupiah(str) {
    if (!str) return 0;
    return parseInt(String(str).replace(/\./g, ''), 10) || 0;
}

export function levelBadge(level) {
    switch (level) {
        case 'super admin':
            return 'badge-warning';
        case 'admin':
            return 'badge-success';
        default:
            return 'badge-error';
    }
}
