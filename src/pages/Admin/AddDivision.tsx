import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddDivisionModal } from "@/components/modules/Admin/Division/AddDivisionModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/ui/Loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useGetDivisionsQuery,
  useRemoveDivisionMutation,
} from "@/redux/features/auth/Division/division.api";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const AddDivision = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);
  const [showLoading, setShowLoading] = useState(false);

  const { data, isLoading, error } = useGetDivisionsQuery({ page: currentPage, limit });
  const [removeDivision] = useRemoveDivisionMutation();

  // Delayed loading state - shows after 0.09 seconds if data not found
  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading && !data) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 90); // 0.09 seconds delay
    } else {
      setShowLoading(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, data]);

  // Pagination logic will be calculated where totalPage is defined

  const handleRemoveDivision = async (divisionId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await removeDivision(divisionId).unwrap();

      if (res.success) {
        toast.success("Removed", { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
  };



  if (showLoading) return (
    <div className="max-w-7xl mx-auto px-5 w-full">
      <Loading
        size="xl"
        variant="spinner"
        text="Loading divisions..."
        fullScreen={false}
        className="min-h-[400px]"
      />
    </div>
  );

  if (error) return (
    <div className="max-w-7xl mx-auto px-5 w-full">
      <div className="flex justify-center items-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="rounded-full bg-red-100 p-3 mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Error Loading Divisions</h3>
            <p className="text-sm text-muted-foreground text-center">Something went wrong while fetching the divisions data. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

    
  // total page 2 => [0, 0]
  const totalPage = data?.meta?.totalPage || 1;

  // Debug pagination (remove after testing)
  console.log('Pagination Data:', {
    totalPage,
    dataLength: data?.length || 0,
    dataContent: data?.slice(0, 3), // First 3 items
    hasMeta: !!data?.meta,
    meta: data?.meta
  });

  return (
    <div className="max-w-7xl mx-auto px-5 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Divisions Management</h1>
          <p className="text-muted-foreground mt-2">Manage and organize your divisions</p>
        </div>
        <AddDivisionModal />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Divisions</CardTitle>
            <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{data?.data?.length || 0}</div>
            <p className="text-xs text-blue-600">
              Active divisions
            </p>
          </CardContent>
        </Card>
{/* it not need implement now */}
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Page</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentPage}</div>
            <p className="text-xs text-muted-foreground">
              of {totalPage} pages
            </p>
          </CardContent>
        </Card> */}

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Last Updated</CardTitle>
            <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">Live</div>
            <p className="text-xs text-green-600">
              Real-time data
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
         {/* Divisions Grid */}
      {(data?.data || data) ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {(data?.data || data).map((item: { _id: string; name: string; description?: string; thumbnail?: string; image?: string }) => (
              <Card key={item._id} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-shrink-0 relative">
                      {item?.thumbnail || item?.image ? (
                        <img
                          src={item.thumbnail || item.image}
                          alt={`${item.name} thumbnail`}
                          className="w-24 h-24 rounded-lg object-cover border border-border"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center ${item?.thumbnail || item?.image ? 'hidden' : ''}`}>
                        <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <DeleteConfirmation
                      onConfirm={() => handleRemoveDivision(item._id)}
                    >
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DeleteConfirmation>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="text-lg mb-2">{item?.name}</CardTitle>
                  {item?.description && (
                    <CardDescription className="text-sm leading-relaxed">
                      {item.description}
                    </CardDescription>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        // Empty State
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6 mb-6">
              <svg className="h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Divisions Found</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              You haven't created any divisions yet. Start by creating your first division to organize your locations.
            </p>
            <div className="mt-6">
              <AddDivisionModal />
            </div>
          </CardContent>
        </Card>
      )}
      </div>
      {/* Pagination - Fixed condition */}
      {(totalPage > 1 || (data?.length || 0) > 0) && (
        <div className="mt-5">
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                  (page) => (
                    <PaginationItem
                      key={page}
                      onClick={() => setCurrentPage(page)}
                    >
                      <PaginationLink isActive={currentPage === page}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={
                      currentPage === totalPage
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )} 
    </div>
  );
};

export default AddDivision;