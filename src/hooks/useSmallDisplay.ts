import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function useSmallDisplay() {
  return useMediaQuery("(max-width:660px)");
}
