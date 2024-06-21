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
    }),
    createCampaign: builder.mutation({
      query: (data) => ({
        url: "/campaigns/create",
        method: "POST",
        body: data,
      }),
    }),
    editCampaign: builder.mutation({
      query: (data) => ({
        url: `/campaigns/edit/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteCampaign: builder.mutation({
      query: (data) => ({
        url: `/campaigns/delete/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),
    approveCampaign: builder.mutation({
      query: (data) => ({
        url: `/campaigns/approve/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),
    publishCampaign: builder.mutation({
      query: (data) => ({
        url: `/campaigns/publish/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),
    rejectCampaign: builder.mutation({
      query: (data) => ({
        url: `/campaigns/reject/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCampaignQuery,
  useGetCampaignByIdQuery,
  useCreateCampaignMutation,
  useEditCampaignMutation,
  useDeleteCampaignMutation,
  useApproveCampaignMutation,
  usePublishCampaignMutation,
  useRejectCampaignMutation,
} = campaignsApi;
