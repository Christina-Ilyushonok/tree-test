import { API_ENDPOINTS } from "../config/configAPI";
import { sendGetRequest, sendPostRequestWithParamsInUrl } from "./api";

export const getTree = async (treeName: string) => {
  return sendGetRequest(API_ENDPOINTS.getTree, { treeName });
};

export const deleteNode = async (treeName: string, nodeId: string) => {
  return sendPostRequestWithParamsInUrl(API_ENDPOINTS.deleteNode, { treeName, nodeId });
}

export const addNode = async (treeName: string, parentNodeId: string, nodeName: string) => {
  return sendPostRequestWithParamsInUrl(API_ENDPOINTS.createNode, { treeName, parentNodeId, nodeName });
};

export const renameNode = async (treeName: string, nodeId: string, newNodeName: string) => {
  return sendPostRequestWithParamsInUrl(API_ENDPOINTS.renameNode, { treeName, nodeId, newNodeName });
};