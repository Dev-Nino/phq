import { useUser } from '../../../../../../contexts/UserContext';

export const CommentWasApproved = () => {
  const { user: userContext } = useUser();
  const { emails, user } = userContext ?? {};
  const { customer } = emails ?? {};

  return (
    <div>
      <div className="mb-3">
        <div className="text-sm text-gray-500">
          {`From: ProductHQ Updates ${customer?.sender_settings ?? 'noreply@producthq.io'}`}
        </div>
        <div className="text-sm text-gray-500">To: customer@company.com</div>
        <div className="text-sm text-gray-500">
          Subject: Your comment has been approved
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="text-[18px] font-medium text-gray-900 mb-2">
          Great work! 🎉
        </div>

        <p className="text-[14px] text-gray-700 mb-3">
          Your comment has been approved and is now live on our board here:
        </p>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-[14px] text-gray-700 italic">
            "<span className="text-gray-500">[First line of comment...]</span>"
          </p>
        </div>

        <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
          View Comment
        </button>

        <p className="text-[14px] text-gray-700 mb-2">
          The <span className="text-gray-500">{user?.company_name}</span> Team
        </p>

        <p className="text-[13px] text-gray-500">
          Help us improve -{' '}
          <a
            href="https://feedback.producthq.io"
            className="text-[#5a00cd]"
            rel="noopener, noreferrer"
            target="_blank"
          >
            share your thoughts
          </a>
        </p>
      </div>
    </div>
  );
};
