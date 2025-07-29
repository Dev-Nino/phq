import { useEffect, useState } from 'react';
import { CustomerEmail } from '../../../types/email';
import { ChevronDownIcon } from '../../../components/icons/chevron-down.icon';
import { emailCategories } from '../../../constants/emails';
import { CustomerWeeklyUpdate } from './email-templates/customers/CustomerWeeklyUpdate';
import { DefaultTemplate } from './email-templates/customers/DefaultTemplate';
import { NewVoteOnIdea } from './email-templates/customers/ideas/NewVoteOnIdea';
import { AdminEditedIdea } from './email-templates/customers/ideas/AdminEditedIdea';
import { IdeaWasApproved } from './email-templates/customers/ideas/IdeaWasApproved';
import { IdeaWasRejected } from './email-templates/customers/ideas/IdeaWasRejected';
import { IdeaStatusChange } from './email-templates/customers/ideas/IdeaStatusChange';
import { CommentOnIdea } from './email-templates/customers/comments/CommentOnIdea';
import { CommentWasApproved } from './email-templates/customers/comments/CommentWasApproved';
import { CommentWasRejected } from './email-templates/customers/comments/CommentWasRejected';
import { NewCommentReply } from './email-templates/customers/comments/NewCommentReply';
import { MentionedInComment } from './email-templates/customers/comments/MentionedInComment';
import { postApi } from '../../../utils/api/api';
import { Toast } from '../../../components/Toast';
import { TypeOptions } from 'react-toastify';
import { WelcomeNewUser } from './email-templates/customers/users/WelcomeNewUser';
import { StatusChangedOnFollowedIdea } from './email-templates/customers/following/StatusChangedOnFollowedIdea';
import { VoteOnFollowedIdea } from './email-templates/customers/following/VoteOnFollowedIdea';
import { IdeaCreatedOnBehalf } from './email-templates/customers/ideas/IdeaCreatedOnBehalf';
import { NewUserSignupApproved } from './email-templates/customers/users/NewUserSignupApproved';
import { CommentOnFollowedIdea } from './email-templates/customers/following/CommentOnFollowedIdea';

export const CustomerEmails = ({
  customerEmail,
  setEmails,
}: {
  customerEmail?: CustomerEmail;
  setEmails: (updated?: CustomerEmail) => void;
}) => {
  const [activeCategorySection, setActiveCategorySection] = useState<
    string | null
  >('ideas');
  const [email, setEmail] = useState<CustomerEmail | undefined>(customerEmail);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    'Customer Weekly Update'
  );
  const [selectedTemplateContent, setSelectedTemplateContent] =
    useState<JSX.Element>();
  const [sending, setSending] = useState<boolean>(false);
  const [testEmailMessage, setTestEmailMessage] = useState<string>('');
  const [toastType, setToastType] = useState<TypeOptions>();

  useEffect(() => {
    setSelectedTemplateContent(
      selectedTemplate === 'admin_edited_idea' ? (
        <AdminEditedIdea />
      ) : selectedTemplate === 'comment_on_idea' ? (
        <CommentOnIdea />
      ) : selectedTemplate === 'comment_was_approved' ? (
        <CommentWasApproved />
      ) : selectedTemplate === 'comment_was_rejected' ? (
        <CommentWasRejected />
      ) : selectedTemplate === 'new_comment_reply' ? (
        <NewCommentReply />
      ) : selectedTemplate === 'new_vote_on_followed_idea' ? (
        <VoteOnFollowedIdea />
      ) : selectedTemplate === 'idea_status_change' ? (
        <IdeaStatusChange />
      ) : selectedTemplate === 'idea_created_on_behalf' ? (
        <IdeaCreatedOnBehalf />
      ) : selectedTemplate === 'new_vote_on_idea' ? (
        <NewVoteOnIdea />
      ) : selectedTemplate === 'idea_was_approved' ? (
        <IdeaWasApproved />
      ) : selectedTemplate === 'idea_was_rejected' ? (
        <IdeaWasRejected />
      ) : selectedTemplate === 'mentioned_in_comment' ? (
        <MentionedInComment />
      ) : selectedTemplate === 'new_user_signup_approved' ? (
        <NewUserSignupApproved />
      ) : selectedTemplate === 'welcome_new_user' ? (
        <WelcomeNewUser />
      ) : selectedTemplate === 'Customer Weekly Update' ? (
        <CustomerWeeklyUpdate />
      ) : selectedTemplate === 'status_changed_on_followed_idea' ? (
        <StatusChangedOnFollowedIdea />
      ) : selectedTemplate === 'comment_on_followed_idea' ? (
        <CommentOnFollowedIdea />
      ) : (
        <DefaultTemplate />
      )
    );
  }, [selectedTemplate]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategorySection(
      activeCategorySection === categoryId ? null : categoryId
    );
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
  };

  const handleSendTestEmail = () => {
    setSending(true);
    postApi<{ message: string }>({
      url: 'emails/test-send',
      payload: { template: selectedTemplate },
    })
      .then((res) => {
        if (res.results.error) {
          setToastType('error');
          setTestEmailMessage(res.results.error);
        }
        if (res.results.data) {
          setToastType('default');
          setTestEmailMessage(res.results.data.message);
        }
      })
      .catch(() => setSending(false))
      .finally(() => setSending(false));
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <p className="text-[14px] text-gray-600 mb-4">
        Configure emails that are sent to your customers
      </p>

      <div className="mb-4">
        <h2 className="text-[16px] font-medium text-gray-900 mb-3">
          Sender Settings
        </h2>
        <div className="flex gap-8">
          <div className="w-1/2">
            <p className="text-[14px] text-gray-600">
              Customize the sender address for all customer emails instead of
              using notifications@producthq.io.{' '}
              <a href="#" className="text-[#5a00cd]">
                Learn how to set up your custom email
              </a>
              .
            </p>
          </div>

          <div className="w-1/2">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="notifications@yoursite.com"
                className="w-[calc(100%-100px)] px-3 py-2 border border-gray-200 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:border-[#5a00cd] focus:ring-1 focus:ring-[#5a00cd]"
                onChange={(e) =>
                  setEmail((prev) => {
                    const sender_settings = e.target.value;
                    if (prev) {
                      return { ...prev, sender_settings };
                    }
                    return { sender_settings };
                  })
                }
                value={email?.sender_settings}
              />
              <button
                className="px-4 py-2 bg-[#FF6334] text-white rounded-lg text-[14px] font-medium hover:bg-[#e55a2f]"
                onClick={() => setEmails(email)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-[16px] font-medium text-gray-900 mb-2">
          Email Templates
        </h2>
        <div className="flex gap-6">
          <div className="w-[250px] space-y-2 pt-4">
            <div
              className={`flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-[#F9F5FF] transition-colors cursor-pointer ${
                selectedTemplate === 'Customer Weekly Update'
                  ? 'bg-[#F9F5FF]'
                  : ''
              }`}
              onClick={() => handleTemplateSelect('Customer Weekly Update')}
            >
              <div className="flex-1">
                <h4 className="text-[14px] font-medium text-gray-900">
                  Customer Weekly Update
                </h4>
              </div>
              <label
                className="relative inline-flex items-center cursor-pointer ml-4"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={email?.weekly_update}
                  onChange={() => {
                    setEmail((prev) => {
                      const weekly_update = email?.weekly_update
                        ? !email.weekly_update
                        : true;
                      if (prev) {
                        return { ...prev, weekly_update };
                      }
                      return { weekly_update };
                    });
                  }}
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5a00cd]"></div>
              </label>
            </div>

            {emailCategories.map((category, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => handleCategoryChange(category.id)}
                  className="w-full flex justify-between items-center p-3 bg-gray-50 text-left hover:bg-gray-100"
                >
                  <h4 className="text-[14px] font-medium text-gray-900">
                    {category.title}
                  </h4>
                  <ChevronDownIcon
                    className={
                      activeCategorySection === category.id
                        ? 'rotate-180 transform'
                        : ''
                    }
                  />
                </button>

                {activeCategorySection === category.id && (
                  <div className="border-t border-gray-200">
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2.5 hover:bg-[#F9F5FF] transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer ${
                          selectedTemplate === item.id ? 'bg-[#F9F5FF]' : ''
                        }`}
                        onClick={() => handleTemplateSelect(item.id)}
                      >
                        <span className="text-[13px] text-gray-700">
                          {item.text}
                        </span>
                        <label
                          className="relative inline-flex items-center cursor-pointer ml-6"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={
                              category.id === 'ideas'
                                ? email?.ideas?.[
                                    item.id as keyof typeof email.ideas
                                  ]
                                : category.id === 'comments'
                                  ? email?.comments?.[
                                      item.id as keyof typeof email.comments
                                    ]
                                  : category.id === 'following'
                                    ? email?.following?.[
                                        item.id as keyof typeof email.following
                                      ]
                                    : category.id === 'users'
                                      ? email?.users?.[
                                          item.id as keyof typeof email.users
                                        ]
                                      : false
                            }
                            className="sr-only peer"
                            onChange={() =>
                              setEmail((prev) => {
                                if (prev) {
                                  const categoryItem = {
                                    [item.id]: prev?.[
                                      category.id as keyof typeof prev
                                    ]?.[item.id as keyof typeof prev.ideas]
                                      ? !prev?.[
                                          category.id as keyof typeof prev
                                        ]?.[item.id as keyof typeof prev.ideas]
                                      : true,
                                  };
                                  switch (category.id) {
                                    case 'ideas':
                                      prev = {
                                        ...prev,
                                        ideas: prev.ideas
                                          ? {
                                              ...prev.ideas,
                                              ...categoryItem,
                                            }
                                          : categoryItem,
                                      };
                                      break;
                                    case 'comments':
                                      prev = {
                                        ...prev,
                                        comments: prev.comments
                                          ? {
                                              ...prev.comments,
                                              ...categoryItem,
                                            }
                                          : categoryItem,
                                      };
                                      break;
                                    case 'following':
                                      prev = {
                                        ...prev,
                                        following: prev.following
                                          ? {
                                              ...prev.following,
                                              ...categoryItem,
                                            }
                                          : categoryItem,
                                      };
                                      break;
                                    case 'users':
                                      prev = {
                                        ...prev,
                                        users: prev.users
                                          ? { ...prev.users, ...categoryItem }
                                          : categoryItem,
                                      };
                                      break;
                                    default:
                                      break;
                                  }
                                }
                                return prev;
                              })
                            }
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5a00cd]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex-1">
            <div className="p-4">
              <div className="bg-white rounded-lg border p-4 min-h-[600px]">
                {selectedTemplateContent}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 px-4">
              <button
                className={`px-4 py-2 text-[14px] font-medium rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors flex items-center gap-2 ${
                  sending
                    ? 'bg-yellow-400 text-black border-yellow-500 animate-pulse cursor-wait'
                    : 'text-[#5a00cd] bg-white border-[#5a00cd] hover:bg-[#F9F5FF] focus:ring-[#5a00cd]'
                }`}
                disabled={sending}
                onClick={handleSendTestEmail}
              >
                {sending && (
                  <span className="inline-block w-4 h-4 border-2 border-t-2 border-t-transparent border-black rounded-full animate-spin"></span>
                )}
                {sending ? 'Sending test email...' : 'Send test email'}
              </button>
              <button
                className="px-4 py-2 text-[14px] font-medium text-white bg-[#FF6334] rounded-lg hover:bg-[#e5592f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6334]"
                onClick={() => setEmails(email)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Branding Section */}
      <div className="mb-4">
        <h2 className="text-[16px] font-medium text-gray-900 mb-3">Branding</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* First Row */}
          <div>
            <h3 className="text-[14px] font-medium text-gray-700">Unfollow</h3>
            <div className="mt-2">
              <input
                id="unfollow"
                type="text"
                defaultValue="Unfollow this idea"
                className="w-[calc(100%-100px)] px-3 py-2 border border-gray-200 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:border-[#5a00cd] focus:ring-1 focus:ring-[#5a00cd]"
              />
            </div>
          </div>

          <div>
            <h3 className="text-[14px] font-medium text-gray-700">
              Unsubscribe
            </h3>
            <div className="mt-2">
              <input
                id="unsubscribe"
                type="text"
                defaultValue="Unsubscribe from all emails"
                className="w-[calc(100%-100px)] px-3 py-2 border border-gray-200 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:border-[#5a00cd] focus:ring-1 focus:ring-[#5a00cd]"
              />
            </div>
          </div>

          {/* Second Row */}
          <div>
            <h3 className="text-[14px] font-medium text-gray-700">
              Change preferences
            </h3>
            <div className="mt-2">
              <input
                id="changePreferences"
                type="text"
                defaultValue="Change email preferences"
                className="w-[calc(100%-100px)] px-3 py-2 border border-gray-200 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:border-[#5a00cd] focus:ring-1 focus:ring-[#5a00cd]"
              />
            </div>
          </div>

          <div>
            <h3 className="text-[14px] font-medium text-gray-700">Footer</h3>
            <div className="mt-2">
              <input
                id="footer"
                type="text"
                defaultValue="#### ProductHQ Group Pty Ltd, 69 Ruthven St, Bondi Junction, NSW, 2022, Australia"
                className="w-[calc(100%-100px)] px-3 py-2 border border-gray-200 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:border-[#5a00cd] focus:ring-1 focus:ring-[#5a00cd]"
              />
            </div>
          </div>
        </div>
      </div>
      {testEmailMessage.length > 0 && (
        <Toast
          message={testEmailMessage}
          onClose={() => {
            setToastType('default');
            setTestEmailMessage('');
          }}
          type={toastType}
        />
      )}
    </div>
  );
};
