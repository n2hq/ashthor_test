import { useSearchParams } from '@remix-run/react';
import { PaginationData } from '~/lib/types';

interface PaginationProps {
    pagination: PaginationData;
}

export default function Pagination({ pagination }: PaginationProps) {
    const [searchParams] = useSearchParams();
    const currentPage = pagination?.currentPage;
    const totalPages = pagination?.totalPages;

    const getPageNumbers = () => {
        if (totalPages <= 7) {
            // If total pages is 7 or less, show all pages
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | string)[] = [];

        // Always include first page
        pages.push(1);

        switch (currentPage) {
            case 1:
                // Page 1 → 1 2 3 ... Last
                pages.push(2, 3, '...', totalPages);
                break;
            case 2:
                // Page 2 → 1 2 3 4 ... Last
                pages.push(2, 3, 4, '...', totalPages);
                break;
            case 3:
                // Page 3 → 1 2 3 4 5 ... Last
                pages.push(2, 3, 4, 5, '...', totalPages);
                break;
            case totalPages - 2:
                // Page n-2 → 1 ... n-3 n-2 n-1 n
                pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                break;
            case totalPages - 1:
                // Page n-1 → 1 ... n-3 n-2 n-1 n
                pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                break;
            case totalPages:
                // Page n → 1 ... n-2 n-1 n
                pages.push('...', totalPages - 2, totalPages - 1, totalPages);
                break;
            default:
                // Middle pages → 1 ... current-1 current current+1 ... Last
                pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                break;
        }

        return pages;
    };

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        return `?${params.toString()}`;
    };

    return (
        <div className="flex flex-row items-center justify-between gap-4">
            <div className="text-[13px] text-gray-500">
                Results {((currentPage - 1) * pagination?.itemsPerPage) + 1} to{' '}
                {Math.min(currentPage * pagination?.itemsPerPage, pagination?.totalItems)} of{' '}
                {pagination?.totalItems}
            </div>

            <nav className="flex items-center space-x-1">
                {/* Previous Button */}
                <a
                    href={pagination?.hasPrev ? createPageUrl(currentPage - 1) : '#'}
                    className={`px-3 py-2 border rounded-md text-sm font-medium ${!pagination?.hasPrev
                        ? 'opacity-50 cursor-not-allowed text-gray-400'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    aria-disabled={!pagination?.hasPrev}
                    onClick={(e) => !pagination?.hasPrev && e.preventDefault()}
                >
                    Prev
                </a>

                {/* Page Numbers */}
                {getPageNumbers()?.map((page, index) => {
                    return (
                        typeof page === 'number' ? (
                            <a
                                key={page}
                                href={createPageUrl(page)}
                                className={`px-3 py-2 border rounded-md text-sm font-medium ${page === currentPage
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </a>
                        ) : (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-3 py-2 text-gray-500"
                            >
                                {page}
                            </span>
                        )
                    )
                }
                )}

                {/* Next Button */}
                <a
                    href={pagination.hasNext ? createPageUrl(currentPage + 1) : '#'}
                    className={`px-3 py-2 border rounded-md text-sm font-medium ${!pagination.hasNext
                        ? 'opacity-50 cursor-not-allowed text-gray-400'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    aria-disabled={!pagination.hasNext}
                    onClick={(e) => !pagination.hasNext && e.preventDefault()}
                >
                    Next
                </a>
            </nav>
        </div>
    );
}