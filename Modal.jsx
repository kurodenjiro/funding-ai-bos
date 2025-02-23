const profileData = props.profileData || [];
const [name, setName] = useState("");
const [accountId, setAccountId] = useState("");
const [image, setImage] = useState("");
const [description, setDescription] = useState("");
const [tags, setTags] = useState([]);
const [teams, setTeams] = useState([]);
const [linktree, setLinkTree] = useState({});
const [height, setHeight] = useState("160px");
const [width, setWidth] = useState("160px");

const isCheck = props.isCheck || "";
const setIsCheck = props.setIsCheck;
const setTwitter = props.setTwitter;
const twitters = props.twitters || "";

const hanleClick = (data, accountId) => {
  if (data.accountId == accountId) {
    setAccountId(accountId);
    setName(data.data.name);
    setImage(data.data.image.ipfs_cid || data.data.image.url);
    setDescription(data.data.description);
    setLinkTree({
      twitter: data.data.linktree.twitter,
      github: data.data.linktree.github,
      telegram: data.data.linktree.telegram,
      website: data.data.linktree.website,
      discord: data.data.linktree.discord,
    });
    console.log(data.data.team);
    if (data.data.tags) {
      setTags(Object.keys(data.data.tags).flat());
    }
    if (data.data.team) {
      setTeams(Object.keys(data.data.team).flat());
    } else {
      setTeams([]);
    }
  }
};

const Checkbox = ({ className, id, type, handleClick, isChecked }) => {
  return (
    <input
      class={className}
      id={id}
      type={type}
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

const handleClick = (e) => {
  const { id, checked } = e.target;
  setIsCheck([...isCheck, id]);
  profileData.forEach(
    ({
      accountId,
      data: {
        linktree: { twitter },
      },
    }) => {
      if (id == accountId) {
        setTwitter([...twitters, twitter]);
      }
    }
  );
  if (!checked) {
    setIsCheck(isCheck.filter((item) => item !== id));
    profileData.forEach(
      ({
        accountId,
        data: {
          linktree: { twitter },
        },
      }) => {
        if (id == accountId) {
          setTwitter(twitters.filter((item) => item !== twitter));
        }
      }
    );
  }
};

const Header = styled.div`
  display:flex;
  flex-direction:row;
  align-items:top;
  justify-content:space-between;
  gap:10px;
  padding:10px 15px;
  .navLeft{
    display:flex;
    gap:10px;
    flex-direction:row;
  }
  .title{
    display:flex;
    flex-direction:column;
    gap:2px;
  }
  .id{
    font-size:14px;
  }
`;
const Description = styled.div`
  display:flex;
  flex-direction:column;
  gap:15px;
  padding:10px 15px;
  font-size:16px;
  .title{
    font-size:18px;
    font-weight:700;
  }
  .desc{
    background-image: linear-gradient(to right top, #cad5fe, #ced9fe, #d3ddff, #d7e0ff, #dce4ff);
    padding: 10px 15px;
    border-radius:10px;
  }
  .tags{
    background-image: linear-gradient(to right top, #cad5fe, #ced9fe, #d3ddff, #d7e0ff, #dce4ff);
    padding: 10px 15px;
    border-radius:10px;
    display:flex;
    flex-direction:row;
    gap:20px;
    flex-wrap:wrap;
    @media screen and (max-width:768px){
      flex-wrap:wrap;
    }
  }
  .tag{
    font-weight:600;
    border:2px solid white;
    padding:5px 10px;
    box-shadow: 0px 2px white;
    max-height:50px;
  }
  .itemTeam{
    display:flex;
    justify-content:center;
    flex-direction:column;
    gap:10px
    @media screen and (max-width:768px){
      flex-direction:row;
      gap:10px
      align-items:center;
    }
  }
  .teams{
    background-image: linear-gradient(to right top, #cad5fe, #ced9fe, #d3ddff, #d7e0ff, #dce4ff);
    padding: 10px 10px;
    border-radius:15px;
    display:flex;
    flex-direction: row;
    justify-content:center;
    flex-wrap: wrap;
    gap:20px;
    @media screen and (max-width:768px){
      ${setHeight("50px")}
      ${setWidth("50px")}
      flex-direction: column;
    }
  }
  .team{
    font-weight:600;
    border: 2px solid white;
    padding:5px 10px;
    border-radius:5px;
    box-shadow: 0px 2px white;
    max-height:50px;
    margin-left:20px;
    &:hover {
      text-decoration: none;
    }
    @media screen and (max-width:768px){
      font-size:13px;
    }
  }
  .social{
    background-image: linear-gradient(to right top, #cad5fe, #ced9fe, #d3ddff, #d7e0ff, #dce4ff);
    padding: 10px 15px;
    border-radius:10px;
    display:flex;
    flex-direction:row;
    gap:20px;
    @media screen and (max-width:768px){
      flex-wrap:wrap;
    }
  }
  .sc{
    background: #9aa8fb;
    padding:3px;
  }
`;

const LinktreeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 14px;
  width: 100%;
  padding-right: 2rem;
`;

const LinktreeItemContainer = styled.a`
  display: flex;
`;

const LinkText = styled.a`
  font-size: 14px;
  color: gray;
  font-weight: 400;
  margin-left: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    text-decoration: none;
  }
`;

const Icon = styled.svg`
  width: 24px;
  height: 24px;
  path,
  rect {
    transition: all 300ms ease-in-out;
  }
  &#near-logo:hover path {
    fill: white;
  }
  :hover path,
  :hover rect {
    fill: rgb(221, 51, 69);
  }
`;

const itemIconUrls = {
  github: (
    <Icon viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="mdi:github">
        <path
          id="Vector"
          d="M12.7998 2C11.4866 2 10.1862 2.25866 8.97297 2.7612C7.75971 3.26375 6.65732 4.00035 5.72874 4.92893C3.85337 6.8043 2.7998 9.34784 2.7998 12C2.7998 16.42 5.6698 20.17 9.6398 21.5C10.1398 21.58 10.2998 21.27 10.2998 21V19.31C7.5298 19.91 6.9398 17.97 6.9398 17.97C6.4798 16.81 5.8298 16.5 5.8298 16.5C4.9198 15.88 5.8998 15.9 5.8998 15.9C6.8998 15.97 7.4298 16.93 7.4298 16.93C8.2998 18.45 9.7698 18 10.3398 17.76C10.4298 17.11 10.6898 16.67 10.9698 16.42C8.7498 16.17 6.4198 15.31 6.4198 11.5C6.4198 10.39 6.7998 9.5 7.4498 8.79C7.3498 8.54 6.9998 7.5 7.5498 6.15C7.5498 6.15 8.3898 5.88 10.2998 7.17C11.0898 6.95 11.9498 6.84 12.7998 6.84C13.6498 6.84 14.5098 6.95 15.2998 7.17C17.2098 5.88 18.0498 6.15 18.0498 6.15C18.5998 7.5 18.2498 8.54 18.1498 8.79C18.7998 9.5 19.1798 10.39 19.1798 11.5C19.1798 15.32 16.8398 16.16 14.6098 16.41C14.9698 16.72 15.2998 17.33 15.2998 18.26V21C15.2998 21.27 15.4598 21.59 15.9698 21.5C19.9398 20.16 22.7998 16.42 22.7998 12C22.7998 10.6868 22.5411 9.38642 22.0386 8.17317C21.5361 6.95991 20.7995 5.85752 19.8709 4.92893C18.9423 4.00035 17.8399 3.26375 16.6266 2.7612C15.4134 2.25866 14.113 2 12.7998 2Z"
          fill="#292929"
        />
      </g>
    </Icon>
  ),
  twitter: (
    <Icon viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="mdi:twitter">
        <path
          id="Vector"
          d="M22.859 6C22.089 6.35 21.259 6.58 20.399 6.69C21.279 6.16 21.959 5.32 22.279 4.31C21.449 4.81 20.529 5.16 19.559 5.36C18.769 4.5 17.659 4 16.399 4C14.049 4 12.129 5.92 12.129 8.29C12.129 8.63 12.169 8.96 12.239 9.27C8.67897 9.09 5.50896 7.38 3.39896 4.79C3.02896 5.42 2.81896 6.16 2.81896 6.94C2.81896 8.43 3.56896 9.75 4.72896 10.5C4.01896 10.5 3.35896 10.3 2.77896 10V10.03C2.77896 12.11 4.25897 13.85 6.21897 14.24C5.58969 14.4122 4.92906 14.4362 4.28896 14.31C4.56057 15.1625 5.0925 15.9084 5.80998 16.4429C6.52746 16.9775 7.39441 17.2737 8.28896 17.29C6.77259 18.4904 4.89296 19.1393 2.95896 19.13C2.61896 19.13 2.27896 19.11 1.93896 19.07C3.83896 20.29 6.09896 21 8.51896 21C16.399 21 20.729 14.46 20.729 8.79C20.729 8.6 20.729 8.42 20.719 8.23C21.559 7.63 22.279 6.87 22.859 6Z"
          fill="#292929"
        />
      </g>
    </Icon>
  ),
  website: (
    <Icon viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="language">
        <mask
          id="mask0_9362_2809"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="25"
          height="24"
        >
          <rect
            id="Bounding box"
            x="0.600098"
            width="24"
            height="24"
            fill="#D9D9D9"
          />
        </mask>
        <g mask="url(#mask0_9362_2809)">
          <path
            id="language_2"
            d="M12.6001 22C11.2334 22 9.94176 21.7375 8.7251 21.2125C7.50843 20.6875 6.44593 19.9708 5.5376 19.0625C4.62926 18.1542 3.9126 17.0917 3.3876 15.875C2.8626 14.6583 2.6001 13.3667 2.6001 12C2.6001 10.6167 2.8626 9.32083 3.3876 8.1125C3.9126 6.90417 4.62926 5.84583 5.5376 4.9375C6.44593 4.02917 7.50843 3.3125 8.7251 2.7875C9.94176 2.2625 11.2334 2 12.6001 2C13.9834 2 15.2793 2.2625 16.4876 2.7875C17.6959 3.3125 18.7543 4.02917 19.6626 4.9375C20.5709 5.84583 21.2876 6.90417 21.8126 8.1125C22.3376 9.32083 22.6001 10.6167 22.6001 12C22.6001 13.3667 22.3376 14.6583 21.8126 15.875C21.2876 17.0917 20.5709 18.1542 19.6626 19.0625C18.7543 19.9708 17.6959 20.6875 16.4876 21.2125C15.2793 21.7375 13.9834 22 12.6001 22ZM12.6001 19.95C13.0334 19.35 13.4084 18.725 13.7251 18.075C14.0418 17.425 14.3001 16.7333 14.5001 16H10.7001C10.9001 16.7333 11.1584 17.425 11.4751 18.075C11.7918 18.725 12.1668 19.35 12.6001 19.95ZM10.0001 19.55C9.7001 19 9.4376 18.4292 9.2126 17.8375C8.9876 17.2458 8.8001 16.6333 8.6501 16H5.7001C6.18343 16.8333 6.7876 17.5583 7.5126 18.175C8.2376 18.7917 9.06676 19.25 10.0001 19.55ZM15.2001 19.55C16.1334 19.25 16.9626 18.7917 17.6876 18.175C18.4126 17.5583 19.0168 16.8333 19.5001 16H16.5501C16.4001 16.6333 16.2126 17.2458 15.9876 17.8375C15.7626 18.4292 15.5001 19 15.2001 19.55ZM4.8501 14H8.2501C8.2001 13.6667 8.1626 13.3375 8.1376 13.0125C8.1126 12.6875 8.1001 12.35 8.1001 12C8.1001 11.65 8.1126 11.3125 8.1376 10.9875C8.1626 10.6625 8.2001 10.3333 8.2501 10H4.8501C4.76676 10.3333 4.70426 10.6625 4.6626 10.9875C4.62093 11.3125 4.6001 11.65 4.6001 12C4.6001 12.35 4.62093 12.6875 4.6626 13.0125C4.70426 13.3375 4.76676 13.6667 4.8501 14ZM10.2501 14H14.9501C15.0001 13.6667 15.0376 13.3375 15.0626 13.0125C15.0876 12.6875 15.1001 12.35 15.1001 12C15.1001 11.65 15.0876 11.3125 15.0626 10.9875C15.0376 10.6625 15.0001 10.3333 14.9501 10H10.2501C10.2001 10.3333 10.1626 10.6625 10.1376 10.9875C10.1126 11.3125 10.1001 11.65 10.1001 12C10.1001 12.35 10.1126 12.6875 10.1376 13.0125C10.1626 13.3375 10.2001 13.6667 10.2501 14ZM16.9501 14H20.3501C20.4334 13.6667 20.4959 13.3375 20.5376 13.0125C20.5793 12.6875 20.6001 12.35 20.6001 12C20.6001 11.65 20.5793 11.3125 20.5376 10.9875C20.4959 10.6625 20.4334 10.3333 20.3501 10H16.9501C17.0001 10.3333 17.0376 10.6625 17.0626 10.9875C17.0876 11.3125 17.1001 11.65 17.1001 12C17.1001 12.35 17.0876 12.6875 17.0626 13.0125C17.0376 13.3375 17.0001 13.6667 16.9501 14ZM16.5501 8H19.5001C19.0168 7.16667 18.4126 6.44167 17.6876 5.825C16.9626 5.20833 16.1334 4.75 15.2001 4.45C15.5001 5 15.7626 5.57083 15.9876 6.1625C16.2126 6.75417 16.4001 7.36667 16.5501 8ZM10.7001 8H14.5001C14.3001 7.26667 14.0418 6.575 13.7251 5.925C13.4084 5.275 13.0334 4.65 12.6001 4.05C12.1668 4.65 11.7918 5.275 11.4751 5.925C11.1584 6.575 10.9001 7.26667 10.7001 8ZM5.7001 8H8.6501C8.8001 7.36667 8.9876 6.75417 9.2126 6.1625C9.4376 5.57083 9.7001 5 10.0001 4.45C9.06676 4.75 8.2376 5.20833 7.5126 5.825C6.7876 6.44167 6.18343 7.16667 5.7001 8Z"
            fill="#292929"
          />
        </g>
      </g>
    </Icon>
  ),
  NEAR: (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="near-logo"
    >
      <rect width="24" height="24" rx="12" fill="#CECECE" />
      <path
        d="M15.616 6.61333L13.1121 10.3333C12.939 10.5867 13.2719 10.8933 13.5117 10.68L15.9756 8.53333C16.0422 8.48 16.1354 8.52 16.1354 8.61333V15.32C16.1354 15.4133 16.0155 15.4533 15.9623 15.3867L8.50388 6.45333C8.26415 6.16 7.91787 6 7.53163 6H7.26526C6.5727 6 6 6.57333 6 7.28V16.72C6 17.4267 6.5727 18 7.27858 18C7.71809 18 8.13097 17.7733 8.3707 17.3867L10.8746 13.6667C11.0477 13.4133 10.7148 13.1067 10.475 13.32L8.0111 15.4533C7.94451 15.5067 7.85128 15.4667 7.85128 15.3733V8.68C7.85128 8.58667 7.97114 8.54667 8.02442 8.61333L15.4828 17.5467C15.7225 17.84 16.0821 18 16.4551 18H16.7214C17.4273 18 18 17.4267 18 16.72V7.28C18 6.57333 17.4273 6 16.7214 6C16.2686 6 15.8557 6.22667 15.616 6.61333Z"
        fill="black"
      />
    </Icon>
  ),
};

const fullUrls = {
  twitter: (handle) => `https://twitter.com/${handle.trim()}`,
  github: (username) => `https://github.com/${username.trim()}`,
  website: (url) => (url.includes("http") ? url : `https://${url.trim()}`),
};

return (
  <>
    {profileData.length > 0 &&
      profileData.map((dt) => (
        <div class="item">
          <div class="itemLeft">
            <Checkbox
              className="form-check-input"
              key={dt.accountId}
              type="checkbox"
              id={dt.accountId}
              handleClick={handleClick}
              isChecked={isCheck.includes(dt.accountId)}
            />
          </div>
          <div
            class="itemRight"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={() => hanleClick(dt, dt.accountId)}
          >
            {dt.data.image.url ? (
              <img class="image" src={dt.data.image.url} alt="profile" />
            ) : (
              <img
                class="image"
                src={`https://ipfs.near.social/ipfs/` + dt.data.image.ipfs_cid}
                alt="profile"
              />
            )}
            <div class="project">
              <div class="title">{dt.data.name}</div>
              <div class="decs">
                {dt.data.description.length > 80
                  ? dt.data.description.slice(0, 80) + "..."
                  : dt.data.description}
              </div>
            </div>
          </div>
        </div>
      ))}
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      style={{ padding: "10px 15px" }}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <Header>
            <div class="navLeft">
              {image && image.startsWith("https") ? (
                <img class="image" src={image} alt="profile" />
              ) : (
                <img
                  class="image"
                  src={`https://ipfs.near.social/ipfs/` + image}
                  alt="profile"
                />
              )}
              <div class="title">
                <h5 class="modal-title" id="staticBackdropLabel">
                  {name}
                </h5>
                <div class="id">@{accountId}</div>
              </div>
            </div>
            <div class="navRight">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </Header>
          <Description class="modal-body">
            <div class="title">Overview</div>
            <div class="desc">{description}</div>
            <div class="title">Tags</div>
            <div class="tags">
              {tags && tags.map((tag) => <div class="tag">{tag}</div>)}
            </div>
            <div class="title">Team Member</div>
            <div class="teams">
              {teams &&
                teams.map((team) => (
                  <div class="itemTeam">
                    <a
                      href={`https://near.social/mob.near/widget/ProfilePage?accountId=${team}`}
                      target="_blank"
                      class="team"
                    >
                      @{team}
                    </a>
                  </div>
                ))}
            </div>
            <div class="title">Social</div>
            <div class="social">
              <LinktreeContainer>
                {linktree &&
                  Object.entries(linktree).map(([k, v], idx) => {
                    return k in itemIconUrls && v ? (
                      <LinktreeItemContainer
                        href={fullUrls[k](v)}
                        disabled={!v}
                        onClick={(e) => {
                          if (!v) {
                            e.preventDefault();
                          }
                        }}
                        target="_blank"
                      >
                        {itemIconUrls[k]}
                      </LinktreeItemContainer>
                    ) : null;
                  })}
                <LinktreeItemContainer
                  target="_blank"
                  href={`https://near.social/mob.near/widget/ProfilePage?accountId=${accountId}`}
                >
                  {itemIconUrls.NEAR}
                </LinktreeItemContainer>
              </LinktreeContainer>
            </div>
          </Description>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>{" "}
  </>
);