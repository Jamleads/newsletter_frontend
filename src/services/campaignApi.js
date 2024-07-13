import { api } from "./api";

const campaignsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCampaign: builder.query({
      query: () => ({
        url: "/campaigns/list",
        method: "GET",
      }),
    }),
    getCampaignById: builder.query({
      query: ({ id }) => ({
        url: `/campaigns/find/id/${id}`,
        method: "GET",
      }),
    }), // TODO: NO USE CASE
    createCampaign: builder.mutation({
      query: (data) => ({
        url: "/campaigns/create",
        method: "POST",
        body: data,
      }),
    }),
    editCampaign: builder.mutation({
      query: ({ data, id }) => ({
        url: `/campaigns/edit/${id}`,
        method: "PATCH",
        body: data,
      }),
    }), // TODO: ERROR
    deleteCampaign: builder.mutation({
      query: (id) => ({
        url: `/campaigns/delete/${id}`,
        method: "DELETE",
      }),
    }),
    approveCampaign: builder.mutation({
      query: (id) => ({
        url: `/campaigns/approve/${id}`,
        method: "PATCH",
      }),
    }),
    publishCampaign: builder.mutation({
      query: (id) => ({
        url: `/campaigns/publish/${id}`,
        method: "PATCH",
      }),
    }),
    rejectCampaign: builder.mutation({
      query: (id) => ({
        url: `/campaigns/reject/${id}`,
        method: "PATCH",
      }),
    }),

    // CAMPAIGN LIST
    getCampaignList: builder.query({
      query: () => ({
        url: `/campaign-lists/list`,
        method: "GET",
      }),
    }),
    getCampaignListById: builder.query({
      query: ({ id }) => ({
        url: `/campaign-lists/find/id/${id}`,
        method: "GET",
      }),
    }), //TODO: NO USE CASE
    creatCampaignList: builder.mutation({
      query: (data) => ({
        url: "/campaign-lists/create",
        method: "POST",
        body: data,
      }),
    }),
    updateCampaignList: builder.mutation({
      query: ({ data, id }) => ({
        url: `/campaign-lists/update/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCampaignList: builder.mutation({
      query: (id) => ({
        url: `/campaign-lists/delete/${id}`,
        method: "DELETE", // PATCH
      }),
    }),
    importSubscribers: builder.mutation({
      query: (data) => ({
        url: `/campaign-lists/upload-subscribers`,
        method: "POST",
        body: data,
      }),
    }),
    getCampaignListSubscribers: builder.query({
      query: (id) => ({
        url: `/campaign-lists/list-subscribers/${id}`,
        method: "GET",
      }),
    }),

    //  SEND THE CAMPAIGN
    sendCampaign: builder.mutation({
      query: (data) => ({
        url: "/campaigns/send",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCampaignListQuery,
  useGetCampaignListByIdQuery,
  useCreatCampaignListMutation,
  useUpdateCampaignListMutation,
  useDeleteCampaignListMutation,
  useImportSubscribersMutation,
  useLazyGetCampaignListSubscribersQuery,
  //
  useGetCampaignQuery,
  useGetCampaignByIdQuery,
  useCreateCampaignMutation,
  useEditCampaignMutation,
  useDeleteCampaignMutation,
  useApproveCampaignMutation,
  usePublishCampaignMutation,
  useRejectCampaignMutation,

  //
  useSendCampaignMutation,
} = campaignsApi;
